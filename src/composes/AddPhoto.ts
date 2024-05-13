import { ref } from "vue";

const useAddPhoto = (uploadPhoto: (photo: File, ...args: any) => Promise<string | undefined>) => {
    const photos = ref([] as string[]);

    const wrappedUploadPhoto = async (photo: File, ...args: any) => {
        const newPhotoUrl = await uploadPhoto(photo, ...args);
        if (newPhotoUrl) photos.value.push(newPhotoUrl);
    };

    const deletePhoto = (value: string) => {
        const index = photos.value.findIndex((el) => el == value);
        photos.value.splice(index, 1);
    };

    return { photos, uploadPhoto: wrappedUploadPhoto, deletePhoto };
};

export default useAddPhoto;
