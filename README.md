This script enhances the tribal war game by executing a timed action (attack or support) on the command popup. The script, more precise the timedout action, is running also when the chrome tab is not focused once a millisecond, due to the usage of web workers.

Copy bookmarklet to your favorit tab: [ActionTimer](javascript:$.ajaxSetup({dataType:"script"});$.getScript('https://nielll.github.io/tsActionTimer/public/dist/bundle.js').done(function() {tsActionTimer.init(new tsActionTimer())}))

Commands to run locally:

```bash
# run locally
npm run serve

# build for production
npm run build
```

## License
*MIT*
