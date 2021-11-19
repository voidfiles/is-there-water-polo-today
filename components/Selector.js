import {
  ChevronDownIcon,
  ChevronUpIcon,
  SelectorIcon,
} from "@heroicons/react/solid";

export default function Selector({ state, cb }) {
  const classData = "inline h-5 w-5 cursor-pointer";

  if (state === "asc") {
    return <ChevronDownIcon className={classData} onClick={() => cb("dsc")} />;
  }

  if (state === "dsc") {
    return (
      <ChevronUpIcon className={classData} onClick={() => cb(undefined)} />
    );
  }

  return <SelectorIcon className={classData} onClick={() => cb("asc")} />;
}
