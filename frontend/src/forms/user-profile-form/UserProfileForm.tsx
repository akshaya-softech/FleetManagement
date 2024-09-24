import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { User } from "@/types";
import { useEffect } from "react";


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z]+$/, "Only letters allowed")
    .trim(),
    designation: z.string()
    .min(1, "Designation is required")
    .regex(/^[a-zA-Z\s]+$/, "Only letters and spaces allowed"),
    profilePicture: z.string().optional(), // Add profilePicture field
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({onSave, isLoading, currentUser}: Props) => {
    const form = useForm<UserFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: currentUser,
    });

    useEffect(() => {
      form.reset(currentUser);
    }, [currentUser, form]);

    return (
        <>      
        <Form {...form}>
          <form 
          onSubmit={form.handleSubmit(onSave)} 
          className="space-y-5 bg-gray-50 rounded-lg md:p-20">
            <div>
              <h2 className="text-2xl font-bold">User Profile</h2>
              <FormDescription>
                View and update your profile information here
              </FormDescription>
            </div>
            
            <FormField control={form.control} name="email" render={({field})=>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-white" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}/>

            <div className="flex flex-col md:flex-row gap-4">
            <FormField control={form.control} name="name" render={({field})=>(
                <FormItem className="flex-1" >
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" maxLength={50} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>

            
              <FormField control={form.control} name="designation" render={({field})=>(
                <FormItem className="flex-1">
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

            {isLoading ? <LoadingButton /> : 
            <Button type="submit" className="bg-violet-400 px-8 py-3 rounded-full w-full md:w-auto mx-auto">
            Submit
            </Button>
            }

          </form>
        </Form>
        </>
    )
        

}

export default UserProfileForm;