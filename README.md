This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to set things up

Do as usual:
```bash
npm install
```

Set up .env var with api-key from theGuardian
```env
NEXT_PUBLIC_API_KEY = <api-key or test>
```

And then just 
```bash
npm run dev
```
If you want to run tests

component testing:
```bash
yarn cypress open-ct 
```

integration tests:
```bash
npm run cypress:open
```

23.06.2021 note: 
cypress component testing is a f*cking mess, workarounds around workarounds\
like wtf... i get that it's still in development and so on, but still :^)\
So not tests like that for now. Wanted to try out jest but... idk, it feels weird to me
