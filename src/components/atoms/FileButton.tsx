import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

interface FileButtonProps {
  loadFile: (file: File | null) => void;
}

const useStyles = makeStyles(() => ({
  file: {
    display: 'none'
  }
}));

const FileButton: FC<FileButtonProps> = ({ loadFile }) => {
  const classes = useStyles();

  return (
    <IconButton component="label">
      <InsertDriveFileIcon />
      <input
        id="fileInput"
        className={classes.file}
        type="file"
        onChange={e =>
          loadFile(e.target.files !== null ? e.target.files[0] : null)
        }
      />
    </IconButton>
  );
};

export default FileButton;
