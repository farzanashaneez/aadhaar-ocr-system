export const fetchData = async (formData:any) => {
    const response =  await fetch(`${import.meta.env.VITE_API_URL}/api/ocr`, {
        method: 'POST',
        body: formData,
      });
    return response;
};