#!/bin/sh
cd /src/web-configuration-tool/

# write lentil configs to values.txt
sed -n '2,26p' "/src/lentil/lentil_config.yml" > "/tmp/combine_values.txt"

while read -r line
do
    name=$line
    export key=`echo $name |cut -d'=' -f1`
    export value=`echo $name |cut -d'=' -f2`

    # write sfm configs to values.txt
    echo $key ':' $value'\n' >> "/tmp/combine_values.txt"
done < "/src/sfm/sfm_config.txt"

# remove leading whitespace
sed -r -i 's/^[ \t]*//' "/tmp/combine_values.txt"

mv /tmp/combine_values.txt committed/values.txt
