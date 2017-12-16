React image preview
===================

# Overview

Simple canvas image preview

![demo.gif](https://github.com/kxmatejka/image-preview/blob/master/demo/demo.gif?raw=true)

# Usage

```
<ImagePreview file={this.state.files[0]}
              width={500} height={500}
              style={{background: '#eee'}}
              onError={() => {alert('error')}} />
```

# Demo and develop

```
git clone https://github.com/kxmatejka/image-preview
npm install
npm run start
```

and visit [localhost:3000/demo/](http://localhost:3000/demo/)

# Next goals

* tests
* default image
* loader icon
* custom setting (max size, only selected formats...)
* multiple files support
* gif support
* publish to npmjs.com
