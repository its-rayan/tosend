"use client";

import * as React from "react";
import { Monitor, Smartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
// const data = [
//   [
//     {
//       label: "Customize Page",
//       icon: Settings2,
//     },
//     {
//       label: "Turn into wiki",
//       icon: FileText,
//     },
//   ],
//   [
//     {
//       label: "Copy Link",
//       icon: Link,
//     },
//     {
//       label: "Duplicate",
//       icon: Copy,
//     },
//     {
//       label: "Move to",
//       icon: CornerUpRight,
//     },
//     {
//       label: "Move to Trash",
//       icon: Trash2,
//     },
//   ],
//   [
//     {
//       label: "Undo",
//       icon: CornerUpLeft,
//     },
//     {
//       label: "View analytics",
//       icon: LineChart,
//     },
//     {
//       label: "Version History",
//       icon: GalleryVerticalEnd,
//     },
//     {
//       label: "Show delete pages",
//       icon: Trash,
//     },
//     {
//       label: "Notifications",
//       icon: Bell,
//     },
//   ],
//   [
//     {
//       label: "Import",
//       icon: ArrowUp,
//     },
//     {
//       label: "Export",
//       icon: ArrowDown,
//     },
//   ],
// ];

export function NavActions() {
  // const [isOpen, setIsOpen] = React.useState(false);

  // React.useEffect(() => {
  //   setIsOpen(true)
  // }, [])

  return (
    <div className="flex items-center gap-2 text-sm">
      {/* <div className="text-muted-foreground hidden font-medium md:inline-block">
        Edit Oct 08
      </div> */}
      <div className="hidden h-8 items-center gap-1.5 rounded-md border p-1 shadow-none lg:flex">
        <div
          role="group"
          className="group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs gap-1 *:data-[slot=toggle-group-item]:!size-6 *:data-[slot=toggle-group-item]:!rounded-sm"
        >
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Monitor />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Smartphone />
          </Button>
        </div>
      </div>
      <Button variant="secondary">Send test</Button>
      <Button>Export</Button>
      {/* <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7"
          >
            <MoreHorizontal />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton>
                            <item.icon /> <span>{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover> */}
    </div>
  );
}
