
#!/bin/bash
mjpg_streamer -i "/usr/local/lib/input_uvc.so -d /dev/video0 -r 320x160 -f 5" -o "/usr/local/lib/output_http.so -p 8090 -w /var/www/mjpg_streamer" &
sudo node index.js &&
killall -15 mjog_streamer
