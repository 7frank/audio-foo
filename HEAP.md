#################################################################

###### Heap clean up some day or never

#################################################################

# TODO dockerfile put things below in a dockerfile

sudo apt install ffmpeg
sudo apt-get install fluidsynth

https://flyingomelette.com/midis.html
https://musical-artifacts.com/artifacts?formats=.sf2&tags=drum
https://musical-artifacts.com/artifacts?apps=sound+blaster
https://www.soundhelix.com/audio-examples

fluidsynth -a alsa -g 1.0 -F output.wav soundfonts/wt_183k_G.sf2 public/audio/fo-abx-ending.mid
ffmpeg -i output.wav output.webm
ffmpeg -i output.wav -codec:a libmp3lame -qscale:a 2 output.mp3

# notes

- currently we can apply a filter to a mp3 and stream it
- but we cannot apply a sound font

## waon

https://chat.openai.com/c/25478be1-da5f-4a82-96cf-adcd0c699923

### install waon

- sudo apt-get install build-essential cmake libsndfile1-dev libfftw3-dev
- git clone https://github.com/kichiki/WaoN.git
- cd WaoN
- make waon

### use waon

ffmpeg -i public/audio/SoundHelix-Song-1.mp3 -acodec pcm_s16le -ar 44100 output.wav
./WaoN/waon -i output.wav -o output.mid

### take the generated midi to a wav file

fluidsynth -a alsa -g 1.0 -F output2.wav output.mid

- or with sound font
  fluidsynth -a alsa -g 1.0 -F output3.wav soundfonts/wt_183k_G.sf2 output.mid

# fluidsynth

Finally, to achieve the desired instrument sounds, you can use soundfonts with a MIDI synthesizer. Soundfonts are sample-based instrument libraries that can be used to generate realistic instrument sounds. You can load a soundfont into a MIDI synthesizer or a software sampler and apply it to the MIDI data generated in the previous steps. This will give you a closer approximation of the desired instrument sounds.

Use FluidSynth to apply soundfonts to the MIDI data generated in the previous steps. FluidSynth is a software synthesizer that can render MIDI files using soundfonts.

- Install FluidSynth on your Linux system. You can typically install it using the package manager of your distribution. For example, on Ubuntu or Debian-based systems, you can run:

  - `sudo apt-get install fluidsynth`

- Obtain a soundfont file (.sf2) that contains the instrument sounds you desire. Soundfonts are available in various libraries and online sources. Make sure to choose a soundfont that includes the specific instrument(s) you want, such as a bass guitar sound.

- Start FluidSynth and load the soundfont file:

  - `fluidsynth -a alsa -g 1.0 /path/to/soundfont.sf2`

- Adjust the -g parameter to control the gain or volume of the generated audio.

- Connect the MIDI output generated in step 4 to FluidSynth. You can use a software or virtual MIDI port for this purpose. For example, if you have a virtual MIDI port named "my_virtual_port," you can connect it to FluidSynth using the aconnect command:

- `aconnect my_virtual_port 128:0`

Note that the MIDI output from step 4 should be available as a MIDI device or file that can be connected to FluidSynth.

- Play the MIDI data through FluidSynth:

- `fluidsynth -a alsa -m alsa_seq /dev/sequencer -F output.wav /path/to/soundfont.sf2 input.mid`

Adjust the output file name (output.wav in the example) and the input MIDI file (input.mid in the example) to match your file names and locations.

This command will render the MIDI data using FluidSynth and the loaded soundfont, and save the resulting audio as a WAV file.

# Spleeter

Spleeter is an open-source library developed by Deezer that uses deep learning to perform source separation on audio files. It can separate vocals, drums, bass, and other instruments from a mixed audio file. Spleeter provides a command-line interface that you can use to process your audio files and extract the individual stems. You can find the installation instructions and usage examples on the official Spleeter GitHub repository.

- https://hub.docker.com/r/deezer/spleeter
- https://indie.audioshake.ai/pricing

- pro: good stem extraction
- con: slow / expensive (hours)
- only really feasible with gpu support

# Open-Unmix

Open-Unmix is another open-source source separation tool developed by Deezer, similar to Spleeter and Demucs. It uses deep learning techniques to separate sources in audio signals. Compared to Spleeter and Demucs, Open-Unmix tends to be faster in terms of processing time while still providing reasonable separation results.

https://hub.docker.com/r/faroit/open-unmix-pytorch

`docker run -v $(pwd)/public/audio/:/data -it faroit/open-unmix-pytorch "/data/SoundHelix-Song-1.wav" --outdir /data/track1`

- this will download ~9GB
- convert the song in about 4-5 minutes with cpu to 4 stems bass/drums/other/vocal
