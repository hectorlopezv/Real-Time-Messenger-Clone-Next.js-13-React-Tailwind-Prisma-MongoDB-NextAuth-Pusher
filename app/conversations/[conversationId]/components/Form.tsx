"use client";
import Input from "@/app/components/inputs/Input";
import useConverstation from "@/app/hooks/useConversation";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";
import { toast } from "react-hot-toast";

type Props = {};

export default function Form({}: Props) {
  const { conversationId } = useConverstation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setValue("message", "", {
      shouldValidate: true,
    });
    axios.post(`/api/messages`, { ...data, conversationId });
  };
  const handleUpload = (result: any) => {
    axios
      .post(`/api/messages`, {
        image: result?.info?.secure_url,
        conversationId,
      })
      .then(() => {
        toast.success("Image uploaded successfully");
      })
      .catch(() => {
        toast.error("Failed to upload image");
      });
  };
  return (
    <div
      className="py-4 px-4 bg-white border-t flex items-center gap-2
  lg:gap-4 w-full"
    >
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="e5uofp0s"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>

      <form
        className="flex items-center gap-2 lg:gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          register={register}
          id={"message"}
          errors={errors}
          required
          placeholder="Write a message"
        />
        <button
          type="submit"
          className="rounded-full p-2 cursor-pointer bg-sky-500 hover:bg-sky-600 transition"
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
