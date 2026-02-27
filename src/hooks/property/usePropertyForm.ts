import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { propertySchema, PropertyFormValues } from "@/schemas/propertySchema";
import { GET_USER_AGENCY } from "@/lib/graphql/agency";
import {
  CREATE_PROPERTY,
  UPDATE_PROPERTY,
  ADD_PROPERTY_PHOTO,
  UPDATE_PROPERTY_PHOTO,
  DELETE_PROPERTY_PHOTO,
} from "@/lib/graphql/property";
import { showToast } from "@/components/Toast";
import type { Photo, Property } from "@/types/property";
import { PATHS } from "@/Utils/paths";
import { useDashboardStore } from "@/stores/dashboardStore";


export const usePropertyForm = (
  mode: "create" | "edit" = "create",
  propertyData: Property | null = null
) => {
  const router = useRouter();
  const invalidateProperties = useDashboardStore((s) => s.invalidateProperties);
  const [photos, setPhotos] = useState<Photo[]>(() => {
    if (mode === "edit" && propertyData?.photos?.length) {
      return propertyData.photos.map((p) => ({
        id: `existing-${p.id}`,
        serverId: p.id,
        url: p.photo,
        existing: true,
      }));
    }
    return [];
  });
  const [photoError, setPhotoError] = useState<string | null>(null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema) as unknown as Resolver<PropertyFormValues>,
    defaultValues: {
      title: "",
      description: "",
      country: "Nigeria",
      state: "",
      address: "",
      price: "",
      propertyType: "",
      intent: "sale",
      rentPaymentPeriod: "yearly",
      area: "",
      bedRooms: "",
      bathRooms: "",
      units: 1,
      currency: "NGN",
      postedBy: "agent",
    },
  });

  const { data: agencyData } = useQuery(GET_USER_AGENCY, {
    skip: mode === "edit",
  });

  const FORM_FIELDS = [
    "title", "description", "country", "state", "address", "price",
    "propertyType", "intent", "rentPaymentPeriod", "area", "bedRooms",
    "bathRooms", "units", "currency", "postedBy",
  ] as const;

  function applyServerErrors(error: { graphQLErrors?: readonly unknown[]; message?: string }, fallbackMessage: string) {
    // This server sends `error` at the top level of the GQL error object (not inside `extensions`)
    const gqlError = error.graphQLErrors?.[0] as { extensions?: { error?: Record<string, string[]> }; error?: Record<string, string[]> } | undefined;
    const fieldErrors = gqlError?.extensions?.error ?? gqlError?.error;
    showToast(fallbackMessage, "error");
    if (fieldErrors && typeof fieldErrors === "object") {
      for (const [key, messages] of Object.entries(fieldErrors)) {
        const fieldName = FORM_FIELDS.find((f) => f.toLowerCase() === key.toLowerCase());
        if (fieldName && Array.isArray(messages) && messages.length > 0) {
          form.setError(fieldName, { type: "server", message: messages[0] });
        }
      }
    }
  }

  const [createProperty, { loading: createLoading }] = useMutation(CREATE_PROPERTY, {
    onCompleted: () => {
      invalidateProperties();
      showToast("Property created successfully!", "success");
      router.push(PATHS.dashboardProperties);
    },
    onError: (error) => {
      const message = error.graphQLErrors?.[0]?.message ?? error.message ?? "Failed to create property.";
      applyServerErrors(error, message);
    },
  });

  const [updateProperty, { loading: updateLoading }] = useMutation(UPDATE_PROPERTY, {
    onCompleted: () => {
      invalidateProperties();
      showToast("Property updated successfully!", "success");
      router.push(PATHS.dashboardProperties);
    },
    onError: (error) => {
      const message = error.graphQLErrors?.[0]?.message ?? error.message ?? "Failed to update property.";
      applyServerErrors(error, message);
    },
  });

  const loading = createLoading || updateLoading;

  const [addPhotosMutation, { loading: addPhotosLoading }] = useMutation(ADD_PROPERTY_PHOTO);
  const [updatePhotoMutation, { loading: updatePhotoLoading }] = useMutation(UPDATE_PROPERTY_PHOTO);
  const [deletePhotoMutation, { loading: deletePhotoLoading }] = useMutation(DELETE_PROPERTY_PHOTO);

  const photoLoading = addPhotosLoading || updatePhotoLoading || deletePhotoLoading;

  function applyAddedPhotos(added: { id: string; photo: string }[]) {
    setPhotos((prev) => [
      ...prev.filter((p) => p.existing),
      ...added.map((p) => ({ id: `existing-${p.id}`, serverId: p.id, url: p.photo, existing: true })),
    ]);
  }

  function applyUpdatedPhoto(updated: { id: string; photo: string }) {
    setPhotos((prev) =>
      prev.map((p) => (p.serverId === updated.id ? { ...p, url: updated.photo } : p))
    );
  }

  function removeDeletedPhoto(serverId: string) {
    setPhotos((prev) => prev.filter((p) => p.serverId !== serverId));
  }

  function handleAddPhotos(files: File[]) {
    if (!propertyData?.id) return;
    addPhotosMutation({
      variables: { propertyId: propertyData.id, files },
      onCompleted: (data) => {
        const added = data.addPropertyPhoto as { id: string; photo: string }[];
        applyAddedPhotos(added);
        showToast(`${added.length} photo(s) added successfully.`, "success");
      },
      onError: (error) => {
        const message = error.graphQLErrors?.[0]?.message ?? error.message ?? "Failed to add photos.";
        showToast(message, "error");
      },
    });
  }

  function handleUpdatePhoto(serverId: string, file: File) {
    updatePhotoMutation({
      variables: { id: serverId, files: [file] },
      onCompleted: (data) => {
        const updated = data.updatePropertyPhoto as { id: string; photo: string };
        applyUpdatedPhoto(updated);
        showToast("Photo updated successfully.", "success");
      },
      onError: (error) => {
        const message = error.graphQLErrors?.[0]?.message ?? error.message ?? "Failed to update photo.";
        showToast(message, "error");
      },
    });
  }

  function handleDeletePhoto(serverId: string) {
    deletePhotoMutation({
      variables: { id: serverId },
      onCompleted: () => {
        removeDeletedPhoto(serverId);
        showToast("Photo deleted.", "success");
      },
      onError: (error) => {
        const message = error.graphQLErrors?.[0]?.message ?? error.message ?? "Failed to delete photo.";
        showToast(message, "error");
      },
    });
  }

  useEffect(() => {
    if (mode === "edit" && propertyData) {
      form.reset({
        title: propertyData.title || "",
        description: propertyData.description || "",
        country: propertyData.country || "Nigeria",
        state: propertyData.state || "",
        address: propertyData.address || "",
        price: propertyData.price?.toString() || "",
        propertyType: propertyData.propertyType || "",
        intent: (propertyData.intent as "sale" | "rent") || "sale",
        rentPaymentPeriod: propertyData.rentPaymentPeriod || "yearly",
        area: propertyData.area || "",
        bedRooms: propertyData.bedRooms?.toString() || "",
        bathRooms: propertyData.bathRooms?.toString() || "",
        units: propertyData.units || 1,
        currency: propertyData.currency || "NGN",
        postedBy: (propertyData.postedBy) || "agent",
      });
    }
  }, [mode, propertyData, form]);

  function buildSharedVariables(values: PropertyFormValues) {
    return {
      title: values.title,
      description: values.description,
      country: values.country,
      state: values.state,
      address: values.address,
      price: Number.parseFloat(values.price),
      propertyType: values.propertyType,
      units: values.units,
      ...(values.area && { area: values.area }),
      ...(values.bedRooms && { bedRooms: Number.parseInt(values.bedRooms, 10) }),
      ...(values.bathRooms && { bathRooms: Number.parseInt(values.bathRooms, 10) }),
      intent: values.intent,
      ...(values.intent === "rent" && { rentPaymentPeriod: values.rentPaymentPeriod }),
      currency: values.currency,
    };
  }

  function onSubmit(values: PropertyFormValues) {
    if (mode === "create") {
      const newFiles = photos.filter((p) => !p.existing && p.file).map((p) => p.file!);
      if (newFiles.length === 0) {
        setPhotoError("At least one photo is required");
        return;
      }
      const agencyId = agencyData?.getUserAgency?.id;
      if (!agencyId) {
        showToast("Agency not found. Please set up your agency first.", "error");
        return;
      }
      createProperty({
        variables: {
          ...buildSharedVariables(values),
          agencyId: agencyId,
          postedBy: values.postedBy,
          files: newFiles,
        },
      });
    } else {
      if (!propertyData?.id) {
        showToast("Property ID not found.", "error");
        return;
      }
      updateProperty({
        variables: {
          ...buildSharedVariables(values),
          id: propertyData.id,
          postedBy: values.postedBy,
        },
      });
    }
  }

  return {
    form, onSubmit, loading,
    photos, setPhotos, photoError, setPhotoError,
    photoLoading, handleAddPhotos, handleUpdatePhoto, handleDeletePhoto,
  };
};
