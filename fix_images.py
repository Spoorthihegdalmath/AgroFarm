import json
import urllib.parse
import re

# Read current products
with open("src/data/products.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract the JSON array
json_start = content.find('[')
json_end = content.rfind(']') + 1
json_str = content[json_start:json_end]

products = json.loads(json_str)

for product in products:
    # Use loremflickr to get realistic images based on keyword
    # We take the first word or main keyword from the name
    name = product["name"]
    # Clean name: remove parentheses and get main noun
    clean_name = re.sub(r'\(.*?\)', '', name).strip()
    
    # URL encode the keyword
    encoded_query = urllib.parse.quote(clean_name.split()[0].lower())
    
    category = product["category"].lower()
    if category == "grains":
        encoded_query = "grain"
    elif category == "spices":
        encoded_query = "spice"
        
    # Generate loremflickr URL, using product id to ensure unique images for same keyword
    new_url = f"https://loremflickr.com/800/800/{encoded_query},{category}?lock={product['id']}"
    
    # Some initial products had valid hardcoded unsplash photo IDs (not the /featured/ search)
    if "images.unsplash.com/photo-" in product["image"]:
        continue # Keep the valid ones
        
    product["image"] = new_url

# Write back
js_content = f"""export const initialProducts = {json.dumps(products, indent=2)};

export const getPlaceholderImage = (category) => {{
  if (category === 'Fruit') return 'https://loremflickr.com/800/800/fruit?lock=1001';
  if (category === 'Vegetable') return 'https://loremflickr.com/800/800/vegetable?lock=1002';
  if (category === 'Grains') return 'https://loremflickr.com/800/800/grain?lock=1003';
  if (category === 'Spices') return 'https://loremflickr.com/800/800/spice?lock=1004';
  return 'https://loremflickr.com/800/800/farm?lock=1005';
}};
"""

with open("src/data/products.js", "w", encoding="utf-8") as out:
    out.write(js_content)

print(f"Updated images for {len(products)} products.")
