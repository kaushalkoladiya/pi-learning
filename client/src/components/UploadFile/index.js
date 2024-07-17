import { uploadFile } from '@/api';
import { Box, Input } from '@mui/material';
import * as React from 'react';


export default function InputFileUpload({ onUpload }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOnUpload = async (file) => {
    setIsLoading(true);
    const { data } = await uploadFile(file);
    onUpload(data[0].blobName);
    setIsLoading(false);
  };

  return (
    <Box>
      <Input
        type='file'
        onChange={(e) => {
          const file = e.target.files[0];
          handleOnUpload(file);
        }}
      />
    </Box>
  );
}
