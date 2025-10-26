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
    <div >
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconFolderCode />
          </EmptyMedia>
          <EmptyTitle>No Todos Yet</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any todos yet. Get started by creating your
            first todo.
          </EmptyDescription>
        </EmptyHeader>

      </Empty>
    </div>
  );
};

export default Vacant;
