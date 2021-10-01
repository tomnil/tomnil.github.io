# 2017-04-15 How to blink the led on the Raspberry PI

blink.sh

```bash
#!/bin/bash
while :
do
echo 1 | sudo tee /sys/class/leds/led1/brightness > /dev/null
sleep 0.05
echo 0 | sudo tee /sys/class/leds/led1/brightness > /dev/null
sleep $1
done

```
