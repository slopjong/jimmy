Licenses
--------

* [pound.mp3](http://www.sounds.beachware.com/phone/pound.htm) [License](http://sounds.beachware.com/rights.htm).
* [blastx1.mp3](http://www.sounds.beachware.com/boombang/blastx1.htm) [License](http://sounds.beachware.com/rights.htm).
* audio[_pitch].(mp3,ogg) produced with the open source tool `espeak` tool which got post-processed.

Convert WAV to MP3
------------------

ffmpeg -i audio.wav -acodec libmp3lame audio.mp3
ffmpeg -i audio.wav -acodec libvorbis audio.ogg
ffmpeg -i audio.mp3 -acodec libvorbis -aq 60 audio.ogg

Links
-----

https://www.youtube.com/watch?v=owfmDQcxyCE
http://superuser.com/questions/292833/how-to-change-audio-frequency
