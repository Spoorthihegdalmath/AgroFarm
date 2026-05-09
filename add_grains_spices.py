import json
import random
import urllib.parse
import re

grains_raw = """
Wheat (Spelt, Durum, Einkorn, Emmer, Kamut)
Rice (Basmati, Jasmine, Brown, White, Red, Black, Arborio)
Corn (Maize, Polenta, Hominy)
Oats (Steel-cut, Rolled, Quick)
Barley (Hulled, Pearl)
Rye
Quinoa (White, Red, Black)
Millet (Pearl, Finger, Foxtail, Kodo, Barnyard, Little)
Sorghum (Jowar)
Buckwheat (Kasha)
Amaranth
Teff
Fonio
Wild Rice
Triticale
Bulgur
Farro
Freekeh
Couscous (Semolina)
Rice (Chawal)
Wheat (Gehun)
Pearl Millet (Bajra)
Finger Millet (Ragi)
Sorghum (Jowar)
Foxtail Millet (Kangni)
Barnyard Millet (Sanwa)
Kodo Millet (Kodra)
Little Millet (Kutki)
Buckwheat (Kuttu)
Amaranth (Rajgira)
Barley (Jau)
"""

spices_raw = """
Turmeric
Cumin
Coriander
Black Pepper
White Pepper
Cardamom (Green and Black)
Cinnamon (Cassia and Ceylon)
Cloves
Star Anise
Nutmeg
Mace
Ginger (Dried/Ground)
Mustard Seeds (Black, Brown, Yellow)
Fenugreek
Fennel Seeds
Allspice
Paprika (Sweet, Smoked, Hot)
Cayenne Pepper
Red Chilli Flakes
Saffron
Sumac
Asafoetida (Hing)
Carom Seeds (Ajwain)
Nigella Seeds (Kalonji)
Caraway Seeds
Celery Seeds
Aniseed
Juniper Berries
Galangal
Grains of Paradise
Vanilla Bean
Turmeric (Haldi)
Cumin (Jeera)
Coriander (Dhaniya)
Black Pepper (Kali Mirch)
Cardamom (Elaichi)
Cloves (Laung)
Cinnamon (Dalchini)
Mustard Seeds (Rai)
Fenugreek (Methi)
Fennel Seeds (Saunf)
Asafoetida (Hing)
Star Anise (Chakra Phool)
Bay Leaf (Tej Patta)
Carom Seeds (Ajwain)
Nutmeg (Jaiphal)
Mace (Javitri)
Dry Mango Powder (Amchur)
Red Chilli (Lal Mirch)
Nigella Seeds (Kalonji)
Saffron (Kesar)
"""

def extract_items(raw_text):
    items = []
    for line in raw_text.split('\n'):
        if not line.strip(): continue
        items.append(line.strip())
    return items

new_grains = extract_items(grains_raw)
new_spices = extract_items(spices_raw)

# Load existing products from the JS file
with open("src/data/products.js", "r", encoding="utf-8") as f:
    content = f.read()
    
# Extract the JSON part using simple parsing
json_str = content[content.find('['):content.rfind(']')+1]
products = json.loads(json_str)

# Map names to avoid duplicates
seen = {p["name"].lower() for p in products}

current_id = len(products) + 1

def add_products(item_list, category, suffix=""):
    global current_id
    for item in item_list:
        if item.lower() not in seen:
            seen.add(item.lower())
            
            # Clean name for URL encoding (remove parentheses)
            search_name = re.sub(r'\(.*?\)', '', item).strip()
            
            encoded_query = urllib.parse.quote(search_name + suffix)
            image_url = f"https://images.unsplash.com/featured/800x800/?{encoded_query}"
            
            price = random.randint(50, 800) if category == 'Spices' else random.randint(20, 200)
            rating = round(random.uniform(4.0, 5.0), 1)
            
            products.append({
                "id": current_id,
                "name": item,
                "category": category,
                "price": price,
                "rating": rating,
                "image": image_url,
                "description": f"Premium quality {item}."
            })
            current_id += 1

add_products(new_grains, "Grains", " grains")
add_products(new_spices, "Spices", " spices")

# Write back to products.js
js_content = f"""export const initialProducts = {json.dumps(products, indent=2)};

export const getPlaceholderImage = (category) => {{
  if (category === 'Fruit') return 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=800';
  if (category === 'Vegetable') return 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80&w=800';
  if (category === 'Grains') return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800';
  if (category === 'Spices') return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';
  return 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=800';
}};
"""

with open("src/data/products.js", "w", encoding="utf-8") as out:
    out.write(js_content)

print(f"Total products now: {len(products)}")
