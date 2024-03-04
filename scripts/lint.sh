#!/bin/bash

eslint src/**/*.{js,jsx,ts,tsx}
stylelint src/**/*.{css,less,scss}
prettier src/**/* --check

echo "检查成功！"
