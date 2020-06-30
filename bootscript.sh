#!/bin/bash

cd /var/run
sudo chmod 777 docker.sock
cd -


cd ../fabric-samples/first-network
./byfn.sh down

cd ../../SLA-VIolation-Single-Node
./rmcc.sh

cd HLF_logs
./startFabric.sh javascript

cd javascript
./remove.sh

node cleanDB.js
node enrollAdmin.js
#node registerInit.js

#comment



