import 'dotenv/config';
import sequelize from '../config/db.js';
import Pharmacy from '../models/Pharmacy.js';

const pharmaciesData = [
  {
    "id": "p001",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Bandra West",
    "full_address": "Shop No. 32, Bandra West Main Road, near Bandra West Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "5.0"
  },
  {
    "id": "p002",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Bandra East",
    "full_address": "Shop No. 27, Bandra East Main Road, near Bandra East Station, Mumbai",
    "contact_phone": "022-2640-9310",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.1"
  },
  {
    "id": "p003",
    "name": "Noble Plus Chemist",
    "neighborhood": "Andheri West",
    "full_address": "Shop No. 4, Andheri West Main Road, near Andheri West Station, Mumbai",
    "contact_phone": "022-2611-5757",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p004",
    "name": "Andheri East Medical Store",
    "neighborhood": "Andheri East",
    "full_address": "Shop No. 33, Andheri East Main Road, near Andheri East Station, Mumbai",
    "contact_phone": "022-2445-7585",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.1"
  },
  {
    "id": "p005",
    "name": "Colaba Medical Store",
    "neighborhood": "Colaba",
    "full_address": "Shop No. 6, Colaba Main Road, near Colaba Station, Mumbai",
    "contact_phone": "022-3099-5733",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.6"
  },
  {
    "id": "p006",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Worli",
    "full_address": "Shop No. 41, Worli Main Road, near Worli Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.8"
  },
  {
    "id": "p007",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Dadar West",
    "full_address": "Shop No. 9, Dadar West Main Road, near Dadar West Station, Mumbai",
    "contact_phone": "022-2640-9028",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.4"
  },
  {
    "id": "p008",
    "name": "Noble Plus Chemist",
    "neighborhood": "Dadar East",
    "full_address": "Shop No. 19, Dadar East Main Road, near Dadar East Station, Mumbai",
    "contact_phone": "022-2611-3857",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.6"
  },
  {
    "id": "p009",
    "name": "Juhu Medical Store",
    "neighborhood": "Juhu",
    "full_address": "Shop No. 2, Juhu Main Road, near Juhu Station, Mumbai",
    "contact_phone": "022-2445-3211",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.6"
  },
  {
    "id": "p010",
    "name": "Malad West Medical Store",
    "neighborhood": "Malad West",
    "full_address": "Shop No. 16, Malad West Main Road, near Malad West Station, Mumbai",
    "contact_phone": "022-3099-7541",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.8"
  },
  {
    "id": "p011",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Malad East",
    "full_address": "Shop No. 25, Malad East Main Road, near Malad East Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "5.0"
  },
  {
    "id": "p012",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Borivali West",
    "full_address": "Shop No. 48, Borivali West Main Road, near Borivali West Station, Mumbai",
    "contact_phone": "022-2640-3866",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.5"
  },
  {
    "id": "p013",
    "name": "Noble Plus Chemist",
    "neighborhood": "Borivali East",
    "full_address": "Shop No. 17, Borivali East Main Road, near Borivali East Station, Mumbai",
    "contact_phone": "022-2611-9458",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.9"
  },
  {
    "id": "p014",
    "name": "Kandivali West Medical Store",
    "neighborhood": "Kandivali West",
    "full_address": "Shop No. 18, Kandivali West Main Road, near Kandivali West Station, Mumbai",
    "contact_phone": "022-2445-5917",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.9"
  },
  {
    "id": "p015",
    "name": "Kandivali East Medical Store",
    "neighborhood": "Kandivali East",
    "full_address": "Shop No. 5, Kandivali East Main Road, near Kandivali East Station, Mumbai",
    "contact_phone": "022-3099-5253",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p016",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Chembur",
    "full_address": "Shop No. 47, Chembur Main Road, near Chembur Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.5"
  },
  {
    "id": "p017",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Mulund West",
    "full_address": "Shop No. 9, Mulund West Main Road, near Mulund West Station, Mumbai",
    "contact_phone": "022-2640-9117",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.5"
  },
  {
    "id": "p018",
    "name": "Noble Plus Chemist",
    "neighborhood": "Mulund East",
    "full_address": "Shop No. 36, Mulund East Main Road, near Mulund East Station, Mumbai",
    "contact_phone": "022-2611-4472",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p019",
    "name": "Ghatkopar West Medical Store",
    "neighborhood": "Ghatkopar West",
    "full_address": "Shop No. 21, Ghatkopar West Main Road, near Ghatkopar West Station, Mumbai",
    "contact_phone": "022-2445-5619",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.7"
  },
  {
    "id": "p020",
    "name": "Ghatkopar East Medical Store",
    "neighborhood": "Ghatkopar East",
    "full_address": "Shop No. 21, Ghatkopar East Main Road, near Ghatkopar East Station, Mumbai",
    "contact_phone": "022-3099-7655",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p021",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Vile Parle West",
    "full_address": "Shop No. 35, Vile Parle West Main Road, near Vile Parle West Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.6"
  },
  {
    "id": "p022",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Vile Parle East",
    "full_address": "Shop No. 2, Vile Parle East Main Road, near Vile Parle East Station, Mumbai",
    "contact_phone": "022-2640-8179",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.3"
  },
  {
    "id": "p023",
    "name": "Noble Plus Chemist",
    "neighborhood": "Santacruz West",
    "full_address": "Shop No. 34, Santacruz West Main Road, near Santacruz West Station, Mumbai",
    "contact_phone": "022-2611-7746",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.4"
  },
  {
    "id": "p024",
    "name": "Santacruz East Medical Store",
    "neighborhood": "Santacruz East",
    "full_address": "Shop No. 43, Santacruz East Main Road, near Santacruz East Station, Mumbai",
    "contact_phone": "022-2445-6155",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p025",
    "name": "Goregaon West Medical Store",
    "neighborhood": "Goregaon West",
    "full_address": "Shop No. 23, Goregaon West Main Road, near Goregaon West Station, Mumbai",
    "contact_phone": "022-3099-9886",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.5"
  },
  {
    "id": "p026",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Goregaon East",
    "full_address": "Shop No. 24, Goregaon East Main Road, near Goregaon East Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p027",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Sion",
    "full_address": "Shop No. 28, Sion Main Road, near Sion Station, Mumbai",
    "contact_phone": "022-2640-3498",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.0"
  },
  {
    "id": "p028",
    "name": "Noble Plus Chemist",
    "neighborhood": "Mahim",
    "full_address": "Shop No. 50, Mahim Main Road, near Mahim Station, Mumbai",
    "contact_phone": "022-2611-1168",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.8"
  },
  {
    "id": "p029",
    "name": "Lower Parel Medical Store",
    "neighborhood": "Lower Parel",
    "full_address": "Shop No. 13, Lower Parel Main Road, near Lower Parel Station, Mumbai",
    "contact_phone": "022-2445-2907",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.6"
  },
  {
    "id": "p030",
    "name": "Powai Medical Store",
    "neighborhood": "Powai",
    "full_address": "Shop No. 27, Powai Main Road, near Powai Station, Mumbai",
    "contact_phone": "022-3099-5036",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.5"
  },
  {
    "id": "p031",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Kurla",
    "full_address": "Shop No. 14, Kurla Main Road, near Kurla Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.7"
  },
  {
    "id": "p032",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Vashi",
    "full_address": "Shop No. 47, Vashi Main Road, near Vashi Station, Mumbai",
    "contact_phone": "022-2640-2949",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p033",
    "name": "Noble Plus Chemist",
    "neighborhood": "Nerul",
    "full_address": "Shop No. 31, Nerul Main Road, near Nerul Station, Mumbai",
    "contact_phone": "022-2611-2791",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.7"
  },
  {
    "id": "p034",
    "name": "Cuffe Parade Medical Store",
    "neighborhood": "Cuffe Parade",
    "full_address": "Shop No. 31, Cuffe Parade Main Road, near Cuffe Parade Station, Mumbai",
    "contact_phone": "022-2445-5140",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.0"
  },
  {
    "id": "p035",
    "name": "Nariman Point Medical Store",
    "neighborhood": "Nariman Point",
    "full_address": "Shop No. 3, Nariman Point Main Road, near Nariman Point Station, Mumbai",
    "contact_phone": "022-3099-7972",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p036",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Fort",
    "full_address": "Shop No. 29, Fort Main Road, near Fort Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.8"
  },
  {
    "id": "p037",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Byculla",
    "full_address": "Shop No. 23, Byculla Main Road, near Byculla Station, Mumbai",
    "contact_phone": "022-2640-9768",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p038",
    "name": "Noble Plus Chemist",
    "neighborhood": "Mazgaon",
    "full_address": "Shop No. 27, Mazgaon Main Road, near Mazgaon Station, Mumbai",
    "contact_phone": "022-2611-4398",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.6"
  },
  {
    "id": "p039",
    "name": "Prabhadevi Medical Store",
    "neighborhood": "Prabhadevi",
    "full_address": "Shop No. 8, Prabhadevi Main Road, near Prabhadevi Station, Mumbai",
    "contact_phone": "022-2445-9326",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "5.0"
  },
  {
    "id": "p040",
    "name": "Matunga Medical Store",
    "neighborhood": "Matunga",
    "full_address": "Shop No. 23, Matunga Main Road, near Matunga Station, Mumbai",
    "contact_phone": "022-3099-7888",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p041",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Wadala",
    "full_address": "Shop No. 35, Wadala Main Road, near Wadala Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p042",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Tardeo",
    "full_address": "Shop No. 37, Tardeo Main Road, near Tardeo Station, Mumbai",
    "contact_phone": "022-2640-1733",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.8"
  },
  {
    "id": "p043",
    "name": "Noble Plus Chemist",
    "neighborhood": "Kemps Corner",
    "full_address": "Shop No. 11, Kemps Corner Main Road, near Kemps Corner Station, Mumbai",
    "contact_phone": "022-2611-8162",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.9"
  },
  {
    "id": "p044",
    "name": "Marine Lines Medical Store",
    "neighborhood": "Marine Lines",
    "full_address": "Shop No. 28, Marine Lines Main Road, near Marine Lines Station, Mumbai",
    "contact_phone": "022-2445-3950",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p045",
    "name": "Grant Road Medical Store",
    "neighborhood": "Grant Road",
    "full_address": "Shop No. 38, Grant Road Main Road, near Grant Road Station, Mumbai",
    "contact_phone": "022-3099-3830",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.4"
  },
  {
    "id": "p046",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Chorni Road",
    "full_address": "Shop No. 14, Chorni Road Main Road, near Chorni Road Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.0"
  },
  {
    "id": "p047",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Walkeshwar",
    "full_address": "Shop No. 31, Walkeshwar Main Road, near Walkeshwar Station, Mumbai",
    "contact_phone": "022-2640-7875",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.3"
  },
  {
    "id": "p048",
    "name": "Noble Plus Chemist",
    "neighborhood": "Breach Candy",
    "full_address": "Shop No. 23, Breach Candy Main Road, near Breach Candy Station, Mumbai",
    "contact_phone": "022-2611-2453",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.6"
  },
  {
    "id": "p049",
    "name": "Altamount Road Medical Store",
    "neighborhood": "Altamount Road",
    "full_address": "Shop No. 39, Altamount Road Main Road, near Altamount Road Station, Mumbai",
    "contact_phone": "022-2445-4550",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p050",
    "name": "Peddar Road Medical Store",
    "neighborhood": "Peddar Road",
    "full_address": "Shop No. 17, Peddar Road Main Road, near Peddar Road Station, Mumbai",
    "contact_phone": "022-3099-5333",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.5"
  },
  {
    "id": "p051",
    "name": "Wellness Forever 24x7",
    "neighborhood": "Nepean Sea Road",
    "full_address": "Shop No. 20, Nepean Sea Road Main Road, near Nepean Sea Road Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p052",
    "name": "Apollo Pharmacy 24x7",
    "neighborhood": "Bandra West",
    "full_address": "Shop No. 39, Bandra West Main Road, near Bandra West Station, Mumbai",
    "contact_phone": "022-2640-3555",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p053",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Bandra East",
    "full_address": "Shop No. 28, Bandra East Main Road, near Bandra East Station, Mumbai",
    "contact_phone": "022-2611-2331",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.5"
  },
  {
    "id": "p054",
    "name": "Andheri West Medical Store",
    "neighborhood": "Andheri West",
    "full_address": "Shop No. 49, Andheri West Main Road, near Andheri West Station, Mumbai",
    "contact_phone": "022-2445-8856",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.4"
  },
  {
    "id": "p055",
    "name": "Andheri East Medical Store",
    "neighborhood": "Andheri East",
    "full_address": "Shop No. 46, Andheri East Main Road, near Andheri East Station, Mumbai",
    "contact_phone": "022-3099-7498",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.9"
  },
  {
    "id": "p056",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Colaba",
    "full_address": "Shop No. 45, Colaba Main Road, near Colaba Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.0"
  },
  {
    "id": "p057",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Worli",
    "full_address": "Shop No. 3, Worli Main Road, near Worli Station, Mumbai",
    "contact_phone": "022-2640-2685",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.8"
  },
  {
    "id": "p058",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Dadar West",
    "full_address": "Shop No. 27, Dadar West Main Road, near Dadar West Station, Mumbai",
    "contact_phone": "022-2611-8354",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.6"
  },
  {
    "id": "p059",
    "name": "Dadar East Medical Store",
    "neighborhood": "Dadar East",
    "full_address": "Shop No. 36, Dadar East Main Road, near Dadar East Station, Mumbai",
    "contact_phone": "022-2445-6172",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.3"
  },
  {
    "id": "p060",
    "name": "Juhu Medical Store",
    "neighborhood": "Juhu",
    "full_address": "Shop No. 33, Juhu Main Road, near Juhu Station, Mumbai",
    "contact_phone": "022-3099-4879",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.7"
  },
  {
    "id": "p061",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Malad West",
    "full_address": "Shop No. 6, Malad West Main Road, near Malad West Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p062",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Malad East",
    "full_address": "Shop No. 2, Malad East Main Road, near Malad East Station, Mumbai",
    "contact_phone": "022-2640-3135",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.1"
  },
  {
    "id": "p063",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Borivali West",
    "full_address": "Shop No. 21, Borivali West Main Road, near Borivali West Station, Mumbai",
    "contact_phone": "022-2611-4910",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.5"
  },
  {
    "id": "p064",
    "name": "Borivali East Medical Store",
    "neighborhood": "Borivali East",
    "full_address": "Shop No. 5, Borivali East Main Road, near Borivali East Station, Mumbai",
    "contact_phone": "022-2445-7989",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.7"
  },
  {
    "id": "p065",
    "name": "Kandivali West Medical Store",
    "neighborhood": "Kandivali West",
    "full_address": "Shop No. 45, Kandivali West Main Road, near Kandivali West Station, Mumbai",
    "contact_phone": "022-3099-7645",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p066",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Kandivali East",
    "full_address": "Shop No. 19, Kandivali East Main Road, near Kandivali East Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.7"
  },
  {
    "id": "p067",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Chembur",
    "full_address": "Shop No. 40, Chembur Main Road, near Chembur Station, Mumbai",
    "contact_phone": "022-2640-1521",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p068",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Mulund West",
    "full_address": "Shop No. 17, Mulund West Main Road, near Mulund West Station, Mumbai",
    "contact_phone": "022-2611-8666",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "5.0"
  },
  {
    "id": "p069",
    "name": "Mulund East Medical Store",
    "neighborhood": "Mulund East",
    "full_address": "Shop No. 7, Mulund East Main Road, near Mulund East Station, Mumbai",
    "contact_phone": "022-2445-8336",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.5"
  },
  {
    "id": "p070",
    "name": "Ghatkopar West Medical Store",
    "neighborhood": "Ghatkopar West",
    "full_address": "Shop No. 34, Ghatkopar West Main Road, near Ghatkopar West Station, Mumbai",
    "contact_phone": "022-3099-2008",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.3"
  },
  {
    "id": "p071",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Ghatkopar East",
    "full_address": "Shop No. 39, Ghatkopar East Main Road, near Ghatkopar East Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.8"
  },
  {
    "id": "p072",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Vile Parle West",
    "full_address": "Shop No. 32, Vile Parle West Main Road, near Vile Parle West Station, Mumbai",
    "contact_phone": "022-2640-7770",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.6"
  },
  {
    "id": "p073",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Vile Parle East",
    "full_address": "Shop No. 15, Vile Parle East Main Road, near Vile Parle East Station, Mumbai",
    "contact_phone": "022-2611-9852",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.2"
  },
  {
    "id": "p074",
    "name": "Santacruz West Medical Store",
    "neighborhood": "Santacruz West",
    "full_address": "Shop No. 23, Santacruz West Main Road, near Santacruz West Station, Mumbai",
    "contact_phone": "022-2445-5667",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.9"
  },
  {
    "id": "p075",
    "name": "Santacruz East Medical Store",
    "neighborhood": "Santacruz East",
    "full_address": "Shop No. 30, Santacruz East Main Road, near Santacruz East Station, Mumbai",
    "contact_phone": "022-3099-1186",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.5"
  },
  {
    "id": "p076",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Goregaon West",
    "full_address": "Shop No. 17, Goregaon West Main Road, near Goregaon West Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.5"
  },
  {
    "id": "p077",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Goregaon East",
    "full_address": "Shop No. 16, Goregaon East Main Road, near Goregaon East Station, Mumbai",
    "contact_phone": "022-2640-9623",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.1"
  },
  {
    "id": "p078",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Sion",
    "full_address": "Shop No. 8, Sion Main Road, near Sion Station, Mumbai",
    "contact_phone": "022-2611-9454",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.7"
  },
  {
    "id": "p079",
    "name": "Mahim Medical Store",
    "neighborhood": "Mahim",
    "full_address": "Shop No. 12, Mahim Main Road, near Mahim Station, Mumbai",
    "contact_phone": "022-2445-9847",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.7"
  },
  {
    "id": "p080",
    "name": "Lower Parel Medical Store",
    "neighborhood": "Lower Parel",
    "full_address": "Shop No. 6, Lower Parel Main Road, near Lower Parel Station, Mumbai",
    "contact_phone": "022-3099-1631",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.9"
  },
  {
    "id": "p081",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Powai",
    "full_address": "Shop No. 26, Powai Main Road, near Powai Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p082",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Kurla",
    "full_address": "Shop No. 46, Kurla Main Road, near Kurla Station, Mumbai",
    "contact_phone": "022-2640-5821",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.8"
  },
  {
    "id": "p083",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Vashi",
    "full_address": "Shop No. 24, Vashi Main Road, near Vashi Station, Mumbai",
    "contact_phone": "022-2611-6984",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.0"
  },
  {
    "id": "p084",
    "name": "Nerul Medical Store",
    "neighborhood": "Nerul",
    "full_address": "Shop No. 42, Nerul Main Road, near Nerul Station, Mumbai",
    "contact_phone": "022-2445-3425",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.1"
  },
  {
    "id": "p085",
    "name": "Cuffe Parade Medical Store",
    "neighborhood": "Cuffe Parade",
    "full_address": "Shop No. 10, Cuffe Parade Main Road, near Cuffe Parade Station, Mumbai",
    "contact_phone": "022-3099-7584",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.0"
  },
  {
    "id": "p086",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Nariman Point",
    "full_address": "Shop No. 48, Nariman Point Main Road, near Nariman Point Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.6"
  },
  {
    "id": "p087",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Fort",
    "full_address": "Shop No. 50, Fort Main Road, near Fort Station, Mumbai",
    "contact_phone": "022-2640-8147",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p088",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Byculla",
    "full_address": "Shop No. 34, Byculla Main Road, near Byculla Station, Mumbai",
    "contact_phone": "022-2611-8817",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.9"
  },
  {
    "id": "p089",
    "name": "Mazgaon Medical Store",
    "neighborhood": "Mazgaon",
    "full_address": "Shop No. 20, Mazgaon Main Road, near Mazgaon Station, Mumbai",
    "contact_phone": "022-2445-8588",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.1"
  },
  {
    "id": "p090",
    "name": "Prabhadevi Medical Store",
    "neighborhood": "Prabhadevi",
    "full_address": "Shop No. 34, Prabhadevi Main Road, near Prabhadevi Station, Mumbai",
    "contact_phone": "022-3099-6356",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.1"
  },
  {
    "id": "p091",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Matunga",
    "full_address": "Shop No. 46, Matunga Main Road, near Matunga Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "3.6"
  },
  {
    "id": "p092",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Wadala",
    "full_address": "Shop No. 2, Wadala Main Road, near Wadala Station, Mumbai",
    "contact_phone": "022-2640-7048",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.0"
  },
  {
    "id": "p093",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Tardeo",
    "full_address": "Shop No. 10, Tardeo Main Road, near Tardeo Station, Mumbai",
    "contact_phone": "022-2611-1469",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.6"
  },
  {
    "id": "p094",
    "name": "Kemps Corner Medical Store",
    "neighborhood": "Kemps Corner",
    "full_address": "Shop No. 21, Kemps Corner Main Road, near Kemps Corner Station, Mumbai",
    "contact_phone": "022-2445-4596",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.3"
  },
  {
    "id": "p095",
    "name": "Marine Lines Medical Store",
    "neighborhood": "Marine Lines",
    "full_address": "Shop No. 11, Marine Lines Main Road, near Marine Lines Station, Mumbai",
    "contact_phone": "022-3099-2706",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.7"
  },
  {
    "id": "p096",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Grant Road",
    "full_address": "Shop No. 1, Grant Road Main Road, near Grant Road Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p097",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Chorni Road",
    "full_address": "Shop No. 45, Chorni Road Main Road, near Chorni Road Station, Mumbai",
    "contact_phone": "022-2640-4807",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.1"
  },
  {
    "id": "p098",
    "name": "Noble Plus Chemist (Branch 1)",
    "neighborhood": "Walkeshwar",
    "full_address": "Shop No. 32, Walkeshwar Main Road, near Walkeshwar Station, Mumbai",
    "contact_phone": "022-2611-4510",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.5"
  },
  {
    "id": "p099",
    "name": "Breach Candy Medical Store",
    "neighborhood": "Breach Candy",
    "full_address": "Shop No. 9, Breach Candy Main Road, near Breach Candy Station, Mumbai",
    "contact_phone": "022-2445-3521",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.0"
  },
  {
    "id": "p100",
    "name": "Altamount Road Medical Store",
    "neighborhood": "Altamount Road",
    "full_address": "Shop No. 22, Altamount Road Main Road, near Altamount Road Station, Mumbai",
    "contact_phone": "022-3099-5874",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.6"
  },
  {
    "id": "p101",
    "name": "Wellness Forever 24x7 (Branch 1)",
    "neighborhood": "Peddar Road",
    "full_address": "Shop No. 21, Peddar Road Main Road, near Peddar Road Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.8"
  },
  {
    "id": "p102",
    "name": "Apollo Pharmacy 24x7 (Branch 1)",
    "neighborhood": "Nepean Sea Road",
    "full_address": "Shop No. 26, Nepean Sea Road Main Road, near Nepean Sea Road Station, Mumbai",
    "contact_phone": "022-2640-7955",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.4"
  },
  {
    "id": "p103",
    "name": "Noble Plus Chemist (Branch 2)",
    "neighborhood": "Bandra West",
    "full_address": "Shop No. 49, Bandra West Main Road, near Bandra West Station, Mumbai",
    "contact_phone": "022-2611-5404",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.5"
  },
  {
    "id": "p104",
    "name": "Bandra East Medical Store",
    "neighborhood": "Bandra East",
    "full_address": "Shop No. 2, Bandra East Main Road, near Bandra East Station, Mumbai",
    "contact_phone": "022-2445-2200",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.1"
  },
  {
    "id": "p105",
    "name": "Andheri West Medical Store",
    "neighborhood": "Andheri West",
    "full_address": "Shop No. 47, Andheri West Main Road, near Andheri West Station, Mumbai",
    "contact_phone": "022-3099-3148",
    "open_24_7": true,
    "home_delivery": false,
    "rating": "4.0"
  },
  {
    "id": "p106",
    "name": "Wellness Forever 24x7 (Branch 2)",
    "neighborhood": "Andheri East",
    "full_address": "Shop No. 11, Andheri East Main Road, near Andheri East Station, Mumbai",
    "contact_phone": "1800-10-24-24-7",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.7"
  },
  {
    "id": "p107",
    "name": "Apollo Pharmacy 24x7 (Branch 2)",
    "neighborhood": "Colaba",
    "full_address": "Shop No. 26, Colaba Main Road, near Colaba Station, Mumbai",
    "contact_phone": "022-2640-3411",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "3.9"
  },
  {
    "id": "p108",
    "name": "Noble Plus Chemist (Branch 2)",
    "neighborhood": "Worli",
    "full_address": "Shop No. 32, Worli Main Road, near Worli Station, Mumbai",
    "contact_phone": "022-2611-5302",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.7"
  },
  {
    "id": "p109",
    "name": "Dadar West Medical Store",
    "neighborhood": "Dadar West",
    "full_address": "Shop No. 45, Dadar West Main Road, near Dadar West Station, Mumbai",
    "contact_phone": "022-2445-1201",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.6"
  },
  {
    "id": "p110",
    "name": "Dadar East Medical Store",
    "neighborhood": "Dadar East",
    "full_address": "Shop No. 1, Dadar East Main Road, near Dadar East Station, Mumbai",
    "contact_phone": "022-3099-7869",
    "open_24_7": true,
    "home_delivery": true,
    "rating": "4.6"
  }
];

const seedPharmacies = async () => {
    try {
        console.log('Connecting to database...');
        await sequelize.authenticate();
        
        console.log('Syncing Pharmacy model...');
        await sequelize.sync({ alter: true });
        
        console.log('Clearing existing pharmacies...');
        await Pharmacy.destroy({ where: {} });
        
        console.log('Inserting 110 records...');
        await Pharmacy.bulkCreate(pharmaciesData);

        console.log('Pharmacies seeded successfully! 🌱💊');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding pharmacy DB:', error);
        process.exit(1);
    }
};

seedPharmacies();
