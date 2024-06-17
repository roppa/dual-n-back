#!/bin/bash

# Define the list of letters
letters=("s" "t" "u" "v" "w" "x" "y" "z")

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null
then
    echo "ffmpeg could not be found. Please install ffmpeg and try again."
    exit 1
fi

# Loop through each letter and create an MP3 file
for letter in "${letters[@]}"; do
    AIFF_FILE="${letter}.aiff"
    MP3_FILE="audio/${letter}.mp3"
    
    # Use `say` to generate AIFF file
    say -o $AIFF_FILE "$letter"
    
    # Convert AIFF to MP3
    ffmpeg -i $AIFF_FILE $MP3_FILE
    
    # Clean up AIFF file
    rm $AIFF_FILE

    echo "MP3 file created: $MP3_FILE"
done

echo "All MP3 files created successfully."
