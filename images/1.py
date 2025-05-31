import os
import shutil
import uuid

# Local Windows paths
source_folder = r"C:\Users\MK\Desktop\se\images\source"
target_folder = r"C:\Users\MK\Desktop\se\images"

# Ensure target directory exists
os.makedirs(target_folder, exist_ok=True)

# Mapping of filenames to new names
file_rename_map = {
    "th.jpeg": "tech_circuit.jpg",
    "th (1).jpeg": "tech_network.jpg",
    "th (2).jpeg": "tech_orb.jpg",
    "th (3).jpeg": "tech_globe.jpg",
    "pexels-nicolasveithen-1719669.jpg": "tractor.jpg",
    "pexels-quang-nguyen-vinh-222549-2165688.jpg": "sunset_fields.jpg",
    "pexels-pixabay-265216.jpg": "wheat.jpg",
    "pexels-timmossholder-974314.jpg": "farmland_rows.jpg"
}

for original_name, new_name in file_rename_map.items():
    src_path = os.path.join(source_folder, original_name)
    dst_path = os.path.join(target_folder, new_name)
    try:
        shutil.copyfile(src_path, dst_path)
        print(f"✔ Copied {original_name} → {new_name}")
    except FileNotFoundError:
        print(f"❌ File not found: {original_name}")
