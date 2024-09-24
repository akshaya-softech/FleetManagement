import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"
import { Link } from "react-router-dom";
import { Battery, Car, LayoutDashboard, LoaderPinwheel, TriangleAlert, User, NotebookPen } from "lucide-react";

const Sidebar = () => {
    return (<div className="top-0 left-0 h-full z-50">
        <Command className='bg-white rounded-none'>
        <CommandInput placeholder="Search" />
        <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading=" ">
            <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <Link to="/">Dashboard</Link>
            </CommandItem>
            <CommandItem>
                <TriangleAlert className='mr-2 h-4 w-4' />
                <Link to="/alert">Alert Reminder</Link>
            </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Inventory">
            <CommandItem>
                <User className='mr-2 h-4 w-4' />
                <Link to="/list-driver">Driver</Link>
            </CommandItem>
            <CommandItem>
                <Car className='mr-2 h-4 w-4' />
                <Link to="/inventory-vehicle">Vehicle</Link>
            </CommandItem>
            <CommandItem>
                <LoaderPinwheel className='mr-2 h-4 w-4' />
                <Link to="/inventory-tyre">Tyre</Link>
            </CommandItem>
            <CommandItem>
                <Battery className='mr-2 h-4 w-4' />
                <Link to="/inventory-battery">Battery</Link>
            </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Daily Entry">
            <CommandItem>
                <NotebookPen className='mr-2 h-4 w-4' />
                <Link to="/entry-vehicle">Form</Link>
            </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Maintenance">
            <CommandItem>
                <LoaderPinwheel className='mr-2 h-4 w-4' />
                <Link to="/mnt-tyre">Tyre MNT</Link>
            </CommandItem>
            <CommandItem>
                <Battery className='mr-2 h-4 w-4' />
                <Link to="/mnt-battery">Battery MNT</Link>
            </CommandItem>
        </CommandGroup>
        </CommandList>
    </Command>
    </div>
  );
  
};

export default Sidebar;