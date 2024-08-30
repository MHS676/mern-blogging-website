import axios from 'axios';

export const uploadImage = async (img) => {
    let imgUrl = null;

    try {
        const serverDomain = import.meta.env.VITE_SERVER_DOMAIN;
        if (!serverDomain) {
            throw new Error("Server domain is not defined. Check your environment variables.");
        }

        const { data: { uploadURL } } = await axios.get(`${serverDomain}/get-upload-url`);

        console.log('Presigned URL:', uploadURL); // Debugging output

        // Dynamic Content-Type based on file type
        await axios.put(uploadURL, img, {
            headers: { 'Content-Type': img.type },
        });

        imgUrl = uploadURL.split('?')[0];  // Extract the URL without query parameters
    } catch (error) {
        console.error('Error uploading image:', error);
    }

    return imgUrl;
};
