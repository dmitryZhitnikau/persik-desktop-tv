#!/bin/sh

cat <<EOT >> ./platforms/android/build-extras.gradle
configurations.all {
    resolutionStrategy {
        force 'com.android.support:support-v4:27.1.0'
    }
}
EOT
