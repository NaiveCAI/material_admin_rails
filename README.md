# MaterialAdmin
Use rails webpacker to bundle the material admin template.

https://www.wrappixel.com/demos/admin-templates/material-pro/Documentation/document.html

Easily install and set up admin quickly

## Prerequisite
- Need set up your db first
- Used js libraries
```json
{
  "name": "MyProject",
  "private": true,
  "dependencies": {
    "@rails/webpacker": "5.1.1",
    "core-js": "3",
    "file-loader": "^6.0.0",
    "url-loader": "^4.1.0",
    "expose-loader": "^0.7.5",
    "resolve-url-loader": "^3.1.1",
    "jquery": "^3.5.1",
    "select2": "^4.0.13",
    "popper.js": "^1.16.1",
    "rails-ujs": "^5.2.4-2",
    "stimulus": "^1.1.1",
    "turbolinks": "^5.2.0",
    "datatables.net-bs4": "^1.10.21",
    "datatables.net-responsive-bs4": "^2.2.5"
  },
  "devDependencies": {
    "webpack-dev-server": "^3.11.0"
  }
}
```


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


## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
