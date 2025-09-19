import { RotateCcw, Tag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "usehooks-ts";

import { resetTags, setTags } from "@/store/appSlice";
import type { RootState } from "@/store/store";
import type { IJob } from "@/types";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMemo } from "react";
import { Button } from "./ui/button";

interface IJobsTagsProps {
  items: IJob[];
}

const JobsTags = ({ items }: IJobsTagsProps) => {
  const dispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.app.tags);
  const { width } = useWindowSize();

  const uniqueTags = useMemo(
    () =>
      [...new Set(items.map((item) => item.tags).flat())].sort((a, b) =>
        a.localeCompare(b)
      ),
    [items]
  );

  const onReset = () => dispatch(resetTags());

  const onJobClick = (tag: string) => {
    dispatch(setTags(tag));
  };

  const anyTagsSelected = tags.length > 0;
  const drawerPosition = width > 768 ? "top" : "right";

  return (
    <Drawer direction={drawerPosition} key="jobs-tags">
      <DrawerTrigger asChild>
        <Button
          title="Jobs Tags"
          size="icon"
          variant="ghost"
          className="shadow-none size-7"
        >
          <Tag className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Jobs Tags ({uniqueTags.length})</DrawerTitle>
          <DrawerDescription>
            Select jobs tags, to filter jobs.
          </DrawerDescription>
        </DrawerHeader>

        <div className="overflow-auto">
          <ul className="flex flex-row justify-center items-center gap-1 flex-wrap px-4">
            {uniqueTags.map((tag) => (
              <li key={tag} className="flex-1">
                <Button
                  className="border w-full shadow-none"
                  variant={tags.includes(tag) ? "default" : "outline"}
                  onClick={() => onJobClick(tag)}
                >
                  <Tag className="size-4" />
                  <span className="text-xs lg:text-sm">{tag}</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <DrawerFooter className="flex justify-center flex-row gap-2 items-center w-full">
          <Button
            onClick={onReset}
            className="w-fit"
            disabled={!anyTagsSelected}
          >
            <RotateCcw className="size-4" />
            Reset Tags
          </Button>

          <DrawerClose asChild>
            <Button className="w-fit" variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default JobsTags;
