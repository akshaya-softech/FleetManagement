import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Driver } from "@/types";
import { addDays, format } from "date-fns";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DefaultImage from "../../assets/avatar-blank.jpeg";
import UploadingAnimation from "../../assets/uploading.gif";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import BackButton from "@/components/BackButton";
import { House } from 'lucide-react';


const formSchema = z.object({
  name: z.string(),
  empNumber: z.string(),
  fatherName: z.string().optional(),
  address: z.string().optional(),
  mobileNumber: z
    .string()
    //.min(1000000000, "Mobile number is required")
    .max(9999999999, "Enter a valid Mobile number"),
  aadharNumber: z
    .string()
    //.min(100000000000, "Aadhar is required")
    .max(999999999999, "Aadhar cannot exceed 12 digit"),
  licenseNumber: z
    .string(),
  licenseExpiry: z
    .string()
    .refine((value) => {
      const date = new Date(value);
      return !isNaN(date.getTime()) && date >= new Date();
    }, "License expiry date must be in the future"),
  isActive: z.boolean().default(false), // Add isActive field with default value false
});

const cloudName = "dc5iwkwct";
const uploadPreset = "ml_default";

export type DriverFormData = z.infer<typeof formSchema>;

type Props = {
  currentDriver: Driver;
  onSave: (driverProfileData: DriverFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const DriverProfileForm = ({onSave, isLoading, currentDriver}: Props) => {
  const [date, setDate] = React.useState<Date>()
  const [avatarURL, setAvatarURL] = React.useState(DefaultImage);
    const form = useForm<DriverFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        licenseExpiry: currentDriver.licenseExpiry.toISOString(), // Convert to string
      },
    });

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]; // Access file using optional chaining
      if (file) {
        uploadImage(file);
      }
    };

    const handleBrowseClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const uploadImage = async (file: File) => {
      try {
        setAvatarURL(UploadingAnimation);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();   

          setAvatarURL(data.secure_url);
        } else {
          console.error("Upload failed:", response.statusText);
          setAvatarURL(DefaultImage);
        }
      } catch (error) {
        console.error(error);
        setAvatarURL(DefaultImage);
      }
    };

    return (
        <>      
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSave)} 
          className="bg-gray-50 rounded-lg md:p-10">

        <div className="absolute top-5 mb-10">
          {isLoading ? <BackButton /> : (
            <Button
              type="submit"
              className="bg-violet-400 top-0 left-12.5 px-3 py-3 rounded-half w-full md:w-auto mx-auto"
              onClick={() => {
                // Navigate to the home page
                window.location.href = '/list-driver';
              }}
            >
              <ArrowLeft className="text-white top-5 left-15 mr-1"/>
              Back to list
              
            </Button>
            
          )}
        </div>

            <div>
              <h2 className="text-3xl font-bold mt-10">Driver Profile</h2>
              <FormDescription>
                View and update driver profile information here
              </FormDescription>
            </div>

            <div className="relative justify-center h-25 w-25 m-3">
            <img 
              src={avatarURL}
              alt ="Avatar"
              className="h-20 w-20 rounded-full" />
                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex justify-centre gap-2">
                    <Button variant="outline" className="gap-2 flex-4">+ Add Driver Photo</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Add Profile Photo</DialogTitle>
                      <DialogDescription>
                        Make changes to driver profile photo. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <form id="form" encType='multipart/form-data'>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
                    <DialogFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={handleBrowseClick}>
                        Browse Collections
                      </Button>
                      <Button type="submit" onClick={form.handleSubmit(onSave)}>
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
                </Dialog>
                </div>

            <div className="flex flex-row gap-2">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={50} style={{ width: '500px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="empNumber" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Employee Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={10} style={{ width: '500px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="flex flex-row-reverse gap-2">
              <FormField control={form.control} name="fatherName" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" style={{ width: '500px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" style={{ width: '500px', margin: '2px' }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div className="flex flex-row-reverse gap-2">
              <FormField control={form.control} name="aadharNumber" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Aadhar Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={12} style={{ width: '500px', margin: '2px' }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="mobileNumber" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={10} style={{ width: '500px', margin: '2px' }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            
            <FormField control={form.control} name="isActive" render={({ field }) => (
              <FormItem className="flex-2" style={{ width: '500px', margin: '2px' }}>
                <FormLabel>Is Active</FormLabel>
                <FormDescription>
                  Status of the employee
                </FormDescription>
                <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                </FormControl>
              </FormItem>
            )} />

            <div className="flex flex-row gap-2">
            <FormField control={form.control} name="licenseNumber" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={10} style={{ width: '300px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

          <FormField control={form.control} name="licenseExpiry" render={({ }) => (
            <FormItem className="flex-1">
              <FormLabel>License Expiry</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[300px] pl-3 text-justify font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                align="start"
                className="flex w-auto flex-col space-y-2 p-2"
              >
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="14">In a week</SelectItem>
                    <SelectItem value="365">In a year</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />
          </div>

                

          <div className="flex justify-center mt-4">
            {isLoading ? <LoadingButton /> : 
            <Button type="submit" className="bg-violet-400 px-8 py-5 rounded-full w-full md:w-auto mx-auto">
            Submit
            </Button>
            }
          </div>
          
          </form>
        </Form>
        </>
    )
        

}

export default DriverProfileForm;