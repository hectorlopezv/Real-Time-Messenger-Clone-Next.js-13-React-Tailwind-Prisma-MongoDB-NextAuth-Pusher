import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "./Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../button/Button";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
};

export default function SettingsModal({ currentUser, onClose, isOpen }: Props) {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);

  const {
    formState: { errors },
    register,
    setValue,
    watch,
    handleSubmit,
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      email: currentUser?.image,
    },
  });
  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsloading(true);
    axios
      .post("/api/settings", data)
      .then((res) => {
        router.refresh();
        onClose();
        toast.success("Profile updated successfully");
      })
      .finally(() => {
        setIsloading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again later");
      });
  };
  return (
    <Modal isOpen={isOpen!} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your profile information.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isloading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    width="48"
                    height="48"
                    className="rounded-full"
                    alt="Avatar"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="e5uofp0s"
                  >
                    <Button disabled={isloading} secondary type="button">
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button disabled={isloading} secondary onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isloading} onClick={onClose}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
