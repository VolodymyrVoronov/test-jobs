import { Status, StatusIndicator, StatusLabel } from "./ui/status";

const ErrorBlock = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Status
        className="gap-4 rounded-full px-6 py-2 text-sm"
        status="offline"
        variant="outline"
      >
        <StatusIndicator />
        <StatusLabel className="font-mono">Failed to fetch jobs!</StatusLabel>
      </Status>
    </div>
  );
};

export default ErrorBlock;
