import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore";
import ReadOnlyField from "../components/fields/ReadOnlyField";
import { InfoFields, InfoFieldsRow } from "../components/fields/InfoFields";

const WIDTH = 350;

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState<string>(
        authUser?.profilePic || "/default-avatar.png"
    );

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const img = document.createElement("img");
            img.src = reader.result as string;

            img.onload = async () => {
                // Create a canvas element to compress the image
                const canvas = document.createElement("canvas");
                const ratio = WIDTH / img.width;
                canvas.width = WIDTH;
                canvas.height = img.height * ratio;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

                const base64Img = ctx?.canvas.toDataURL("image/webp");
                setSelectedImg(base64Img as string);
                await updateProfile({ profilePic: base64Img || "" });
            };
        };
    };

    return (
        <div className="h-screen pt-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="mt-2">Your profile information</p>
                    </div>

                    {/* Avatar upload section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={selectedImg}
                                alt="Profile"
                                className="size-32 rounded-full object-cover border-4"
                            />

                            <label
                                htmlFor="avatar-upload"
                                className={`
                                    absolute bottom-0 right-0 bg-base-content hover:scale-105
                                    rounded-full p-2 cursor-pointer transition-all duration-200
                                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                                `}
                            >
                                <Camera className="size-5 text-base-200" />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>

                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile
                                ? "Uploading..."
                                : "Click the camera icon to upload a new profile picture"}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <ReadOnlyField
                            icon={<User className="size-4" />}
                            label="Full name"
                            value={authUser?.fullName}
                        />

                        <ReadOnlyField
                            icon={<Mail className="size-4" />}
                            label="Email address"
                            value={authUser?.email}
                        />
                    </div>

                    <InfoFields title="Account Information">
                        <InfoFieldsRow
                            label="Member since"
                            value={authUser?.createdAt?.split("T")[0]}
                            className="border-b border-zinc-700"
                        />
                        <InfoFieldsRow label="Account status" value="Active" active />
                    </InfoFields>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
