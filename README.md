# MaterialAdmin
Use rails webpacker to bundle the material admin template.

https://demos.wrappixel.com/premium-admin-templates/bootstrap/materialpro-bootstrap/package/html/material/index.html

Easily install and set up admin quickly

## Prerequisite
- Need set up your db first

```
// Gemfile
gem 'webpacker', '~> 5.0'


// package.json
{
  "dependencies": {
    "@rails/webpacker": "5.4.2",
  },
  "devDependencies": {
    "webpack-dev-server": "^3.11.2"
  }
}
```


## Pitfalls
webpack-cli version should stick to 3.3.12
expose-loader version should stick to 1.0.3


## Usage
### Installation
Add this line to your application's Gemfile:

```ruby
gem 'rails_material_admin'
```

And then execute:
```bash
$ bundle
```

### Init an admin template
```
rails generate material_admin [layout_name]
```

### Init a simple users CRUD template
```
rails generate crud user --options layout_name:[layout_name]
```



## Pitfall
- Manually fix assets precompile error
```css
.row {
  --bs-gutter-x: 30px;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  // margin-top: calc(var(--bs-gutter-y) * -1);
  margin-top: 0; // Tracy fix
  // margin-right: calc(var(--bs-gutter-x) / -2);
  margin-right: -15px; // Tracy fix
  // margin-left: calc(var(--bs-gutter-x) / -2);
  margin-left: -15px; // Tracy fix
}
```




## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
