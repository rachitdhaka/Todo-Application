import React from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
import { ArrowUpRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Vacant = () => {
  const navigate = useNavigate();
  const login = () => {
    navigate("/login");
  };

  const signup = () => {
    navigate("/signup");
  };
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
