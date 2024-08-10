import { Separator } from "@radix-ui/react-separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";


const Navigation = () => {
    return(
        <Sheet>
            <SheetTrigger>
                <Menu className="text-violet-700"/>
            </SheetTrigger>
            <SheetContent className="space-y-4">
                <SheetTitle>
                    <span>Welcome back     
                    </span>
                </SheetTitle>
                <Separator>
                    <SheetDescription className="flex">
                        <Button className="flex-1 font-bold bg-violet-700">Log In</Button>
                    </SheetDescription>
                </Separator>
            </SheetContent>
        </Sheet>
    );
  
};

export default Navigation;