import json
import random
import urllib.parse

# Existing grains to keep (since the user didn't provide a grain list, I'll keep the ones we added manually earlier)
existing_grains = [
  {"name": "Whole Wheat Grains", "category": "Grains", "price": 45, "description": "Finest whole wheat grains."},
  {"name": "Premium Bajra", "category": "Grains", "price": 60, "description": "High-quality pearl millet for a healthy diet."},
  {"name": "Basmati Rice", "category": "Grains", "price": 120, "description": "Long-grain, aromatic Basmati rice."},
  {"name": "Jowar (Sorghum)", "category": "Grains", "price": 55, "description": "Gluten-free, fiber-rich jowar."},
  {"name": "Ragi (Finger Millet)", "category": "Grains", "price": 70, "description": "Calcium-rich ragi grains."},
  {"name": "Imported Quinoa", "category": "Grains", "price": 300, "description": "High-protein white quinoa."},
  {"name": "Rolled Oats", "category": "Grains", "price": 150, "description": "Premium quality rolled oats for a healthy breakfast."},
  {"name": "Brown Rice", "category": "Grains", "price": 90, "description": "Unpolished brown rice, high in fiber."},
  {"name": "Yellow Moong Dal", "category": "Grains", "price": 110, "description": "Protein-packed split yellow lentils."}
]

# Read fruits
with open("fruits_list.txt", "r", encoding="utf-8") as f:
    fruit_lines = [line.strip() for line in f if line.strip()]

# Read vegetables
with open("vegetables_list.txt", "r", encoding="utf-8") as f:
    veg_lines = [line.strip() for line in f if line.strip()]

products = []
current_id = 1
seen = set()

# Helper function to add products
def add_products(item_list, category, suffix=""):
    global current_id
    for item in item_list:
        if item.lower() not in seen:
            seen.add(item.lower())
            
            encoded_query = urllib.parse.quote(item + suffix)
            image_url = f"https://images.unsplash.com/featured/800x800/?{encoded_query}"
            
            price = random.randint(20, 400)
            rating = round(random.uniform(4.0, 5.0), 1)
            
            products.append({
                "id": current_id,
                "name": item,
                "category": category,
                "price": price,
                "rating": rating,
                "image": image_url,
                "description": f"Fresh and high-quality {item}."
            })
            current_id += 1

# Add fruits
add_products(fruit_lines, "Fruit", " fruit")

# Add vegetables
add_products(veg_lines, "Vegetable", " vegetable")

# Add grains
for item in existing_grains:
    encoded_query = urllib.parse.quote(item["name"])
    image_url = f"https://images.unsplash.com/featured/800x800/?{encoded_query}"
    products.append({
        "id": current_id,
        "name": item["name"],
        "category": item["category"],
        "price": item["price"],
        "rating": round(random.uniform(4.0, 5.0), 1),
        "image": image_url,
        "description": item["description"]
    })
    current_id += 1

# Write to products.js
js_content = f"""export const initialProducts = {json.dumps(products, indent=2)};

export const getPlaceholderImage = (category) => {{
  if (category === 'Fruit') return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800';
  if (category === 'Vegetable') return 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800';
  if (category === 'Grains') return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800';
  return 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800';
}};
"""

with open("src/data/products.js", "w", encoding="utf-8") as out:
    out.write(js_content)

print(f"Generated {len(products)} products in src/data/products.js")
