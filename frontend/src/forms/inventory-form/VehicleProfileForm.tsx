import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import LoadingButton from "@/components/LoadingButton";
import { Vehicle } from "@/types";
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import DefaultImage from "../../assets/vehicle-blank.jpeg";
import UploadingAnimation from "../../assets/uploading.gif";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addDays, format } from "date-fns";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/BackButton";
import { ArrowLeft } from 'lucide-react';

const updateDatesSchema = z.object({
  fc: z.object({
    
    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "FC last update date must be in the past or today"),

  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "FC next update date must be in the future"),
  }),

  permit: z.object({

    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "Permit last update date must be in the past or today"),
  
  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "Permit next update date must be in the future"),
  }),

  greentax: z.object({

    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "GreenTax last Update date must be in the past or today"),

  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "Green tax next update date must be in the future"),
  }),

  mvtax: z.object({

    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "MV Tax last Update date must be in the past or today"),

  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "MV tax next update date must be in the future"),
  }),

  motorinsurance: z.object({
    
    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "Motor Insurance last Update date must be in the past or today"),

  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "Motor insurance next update date must be in the future"),
  }),

  cllinsurance: z.object({

    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "CLL Insurance last update date must be in the past or today"),

  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "CLL insurance next update date must be in the future"),
  }),

  pollution: z.object({
    
    lastUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date <= new Date();
  }, "Pollution last update date must be in the past or today"),

  nextUpdate: z.string()
  .refine((value) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) && date > new Date();
  }, "Pollution next update date must be in the future"),
  }),
});

const cloudName = "dc5iwkwct";
const uploadPreset = "ml_default";

const formSchema = z.object({
  vehicleNumber: z.string(),
  vehicleModel: z.string(),
  rcNumber: z.string(),
  isActive: z.boolean(),
  updateDates: updateDatesSchema,
});

export type VehicleFormData = z.infer<typeof formSchema>;

type Props = {
  currentVehicle: Vehicle;
  onSave: (vehicleProfileData: VehicleFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const VehicleProfileData = ({onSave, isLoading}: Props) => {
  const [date, setDate] = React.useState<Date>()
  const [avatarURL, setAvatarURL] = React.useState(DefaultImage);
    const form = useForm<VehicleFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: {
          updateDates: {
            fc: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
            permit: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
            greentax: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
            mvtax: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
            motorinsurance: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
            cllinsurance: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
            pollution: {
              lastUpdate: dayjs().toISOString(),
              nextUpdate: dayjs().add(1, 'year').toISOString(),
            },
          }
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
        
        
        <div className="absolute top-5 left-5 flex mr-2 mb-10">
          {isLoading ? <BackButton /> : (
            <Button
              type="submit"
              className="bg-violet-400 px-5 py-3 text-1xl rounded-half w-full md:w-auto mx-auto"
              onClick={() => {
                // Navigate to the home page
                window.location.href = '/';
              }}
            >
              <ArrowLeft className="text-white top-5 left-15 mr-1"/>
              Home
              
            </Button>
          )}
        </div>

            <div>
              <h2 className="text-3xl font-bold mt-10">Vehicle Profile</h2>
              <FormDescription>
                View and update Vehicle information here
              </FormDescription>
            </div>
            
            <div className="relative justify-center h-30 w-20 m-3">
            <img 
              src={avatarURL}
              alt ="Avatar"
              className="h-20 w-20 rounded-full" />
                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex justify-centre gap-2">
                    <Button variant="outline" className="gap-2 flex-4">+ Add Vehicle Photo</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Add Vehicle Photo</DialogTitle>
                      <DialogDescription>
                        Make changes to vehicle photo. Click save when you're done.
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
              <FormField control={form.control} name="vehicleNumber" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Vehicle Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={50} style={{ width: '300px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleModel" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Vehicle Model</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={10} style={{ width: '300px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="rcNumber" render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>RC Number</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={10} style={{ width: '300px', margin: '2px' }}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

              <FormField control={form.control} name="isActive" render={({ field }) => (
                <FormItem className="text-1xl flex-2" style={{ width: '500px', margin: '2px' }}>
                  <FormLabel>Is Active</FormLabel>
                  <FormDescription>
                    Status of the Vehicle
                  </FormDescription>
                  <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                  </FormControl>
                </FormItem>
              )} />
          
                <div>
                  <h2 className="text-1xl font-bold mt-10">FC</h2>
                  <FormDescription>
                    Update vehicle's Fitness Certificate information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add FC certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add FC certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to FC certificate. Click save when you're done.
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

              <div>
                  <h2 className="text-1xl font-bold">Permit</h2>
                  <FormDescription>
                    Update vehicle's Permit information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2 w-[500px]">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add Permit certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Permit certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to Permit certificate. Click save when you're done.
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

              <div>
                  <h2 className="text-1xl font-bold">Green Tax</h2>
                  <FormDescription>
                    Update vehicle's Green Tax information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />
              <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2 w-[50px]">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add GreenTax certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Green Tax certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to Green Tax certificate. Click save when you're done.
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

              <div>
                  <h2 className="text-1xl font-bold">MV Tax</h2>
                  <FormDescription>
                    Update vehicle's Motor Vehicle Tax information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2 w-[500px]">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add MV Tax certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add MV tax certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to MV Tax certificate. Click save when you're done.
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

              <div>
                  <h2 className="text-1xl font-bold">Motor Insurance</h2>
                  <FormDescription>
                    Update vehicle's Motor Insurance information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2 w-[500px]">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add Motor Insurance certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Motor Insurance certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to Motor Insurance certificate. Click save when you're done.
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

              <div>
                  <h2 className="text-1xl font-bold">Carrier Legal Liability Insurance</h2>
                  <FormDescription>
                    Update vehicle's Carrier Legal Liability Insurance information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2 w-[500px]">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add CLL Insurance certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Carrier Legal Liability certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to CLL certificate. Click save when you're done.
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

              <div>
                  <h2 className="text-1xl font-bold">Pollution</h2>
                  <FormDescription>
                    Update vehicle's Pollution information here
                  </FormDescription>
                </div>

                <div className="flex flex-row gap-20 mb-10">
                <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Last Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="vehicleNumber" render={({ }) => (
                <FormItem className="flex-2">
                  <FormLabel>Next Renewal</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] pl-3 text-justify font-normal",
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
                        onValueChange={(value) => setDate(addDays(new Date(), parseInt(value)))}
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
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )} />

                <Dialog>
                  <DialogTrigger asChild>
                  <div className="flex-2 mt-2 w-[500px]">
                    <Button variant="outline" className="bg-violet-300 rounded-full">+ Add Pollution certificate</Button>
                  </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add Pollution certificate</DialogTitle>
                      <DialogDescription>
                        Make changes to Pollution certificate. Click save when you're done.
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

          <div className="flex justify-center mt-4">
            {isLoading ? <LoadingButton /> : 
            <Button type="submit" className="bg-violet-800 px-12 py-8 rounded-full w-full md:w-auto mx-auto">
            Submit
            </Button>
            }
          </div>
          
          </form>
        </Form>
        </>
    )
        

}

export default VehicleProfileData;