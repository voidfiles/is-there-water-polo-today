import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

export function Yes() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-20 w-20 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-5xl font-medium text-green-800">Yes!</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>There are games today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function No() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon
              className="h-20 w-20 text-red-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-5xl font-medium text-red-800">No!</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>But, there might be upcoming games!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
