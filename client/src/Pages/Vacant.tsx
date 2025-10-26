import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";

const Vacant = () => {
  return (
    <div className="px-4 sm:px-6 py-8 sm:py-12">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode className="w-12 h-12 sm:w-16 sm:h-16" />
          </EmptyMedia>
          <EmptyTitle className="text-lg sm:text-xl md:text-2xl">No Todos Yet</EmptyTitle>
          <EmptyDescription className="text-sm sm:text-base px-4 sm:px-0">
            You haven&apos;t created any todos yet. Get started by creating your
            first todo.
          </EmptyDescription>
        </EmptyHeader>

      </Empty>
    </div>
  );
};

export default Vacant;
