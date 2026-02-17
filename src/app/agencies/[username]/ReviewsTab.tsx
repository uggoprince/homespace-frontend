export default function ReviewsTab() {
  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800/50 p-5 sm:p-6 shadow-lg">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574
                  3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
        <p className="text-slate-600 dark:text-slate-400">Be the first to review this agency</p>
        <button
          type="button"
          className="mt-4 bg-primary hover:bg-primary-2 text-white px-6
            py-2.5 rounded-lg font-medium transition-all hover:scale-105"
        >
          Write a Review
        </button>
      </div>
    </div>
  );
}
