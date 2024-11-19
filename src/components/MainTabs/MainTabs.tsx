import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib";

interface TabListProps {
  value: string;
  label: string;
  className?: string;
}
interface TabContent<T extends string> {
  value: T;
  render: React.ReactNode;
}

interface TabsProps<T extends string> {
  defaultValue: T;
  className?: string;
  tabsLists: Array<{ value: T; label: string; className?: string }>;
  tabsContent: TabContent<T>[];
}

export default function MainTabs<T extends string>(props: TabsProps<T>) {
  return (
    <Tabs defaultValue={props.defaultValue} className={cn(props.className)}>
      <TabsList className="grid w-full grid-cols-2">
        {props.tabsLists.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(tab.className)}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {props.tabsContent.map((content) => (
        <TabsContent value={content.value} key={content.value}>
          {content.render}
        </TabsContent>
      ))}
    </Tabs>
  );
}
