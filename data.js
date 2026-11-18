const groups = [
  { id:'electronics', title:['Electronics & appliances','ଇଲେକ୍ଟ୍ରୋନିକ୍ସ ଓ ଉପକରଣ'], description:['Electrical work, AC, appliances and water purifiers','ଇଲେକ୍ଟ୍ରିକାଲ୍ କାମ, ଏସି ଓ ପାଣି ଫିଲ୍ଟର'], icon:'bolt' },
  { id:'home', title:['Home repairs & moving','ଘର ମରାମତି ଓ ସ୍ଥାନାନ୍ତର'], description:['Plumbing, carpentry, painting, tiles and moving','ପ୍ଲମ୍ବିଂ, କାଠ କାମ, ରଙ୍ଗ, ଟାଇଲ୍ସ ଓ ସ୍ଥାନାନ୍ତର'], icon:'home' },
  { id:'care', title:['Personal care & learning','ବ୍ୟକ୍ତିଗତ ଯତ୍ନ ଓ ଶିକ୍ଷା'], description:['Barber services and one-to-one home tutoring','ବାରିକ ସେବା ଓ ଘରୋଇ ଟ୍ୟୁସନ୍'], icon:'spark' },
  { id:'delivery', title:['Everyday delivery','ଦୈନନ୍ଦିନ ଡେଲିଭରି'], description:['Groceries and medicines picked up for you','କିରାଣା ସାମଗ୍ରୀ ଓ ଔଷଧ ଡେଲିଭରି'], icon:'bag' }
];
const categories = [
  { id:'electrician', group:'electronics', icon:'bolt', title:['Electrician','ଇଲେକ୍ଟ୍ରିସିଆନ୍'], blurb:['Switches, lights, fans and wiring','ସ୍ୱିଚ୍, ଲାଇଟ୍, ପଙ୍ଖା ଓ ତାର କାମ'], items:[
    ['Switch & socket repair',199,299,30,'Fix a loose switch or a socket that has stopped working.','Basic inspection','One fitting','Function test'],
    ['Fan & light installation',299,449,45,'Fit a ceiling fan or a light fixture you already have.','Mounting','Wiring check','Test run'],
    ['Electrical inspection',399,599,60,'Find the source of faults in your home wiring.','Circuit check','Fault diagnosis','Repair estimate']]},
  { id:'appliance', group:'electronics', icon:'snow', title:['Sales & Appliance Service','ଉପକରଣ ବିକ୍ରି ଓ ସର୍ଭିସ୍'], blurb:['AC, washing machine, fridge and more','ଏସି, ୱାଶିଂ ମେସିନ୍, ଫ୍ରିଜ୍ ଓ ଅନ୍ୟାନ୍ୟ'], items:[
    ['AC foam-jet deep clean',699,1130,90,'Foam-jet cleaning for indoor and outdoor AC units.','Foam-jet wash','Filter clean','Cooling check'],
    ['AC gas refill (R-22/R-32)',1499,2460,60,'Refrigerant top-up with a pressure check.','Gas refill','Leak check','Cooling test'],
    ['Washing machine repair',499,830,60,'Diagnose common faults and get a repair estimate.','Diagnosis','Parts quote','Test wash'],
    ['Refrigerator repair',499,850,75,'Check cooling, compressor and gas issues.','Diagnosis','Cooling test','Repair estimate'],
    ['Microwave / OTG repair',399,690,45,'At-home inspection for microwave and OTG faults.','Diagnosis','Repair estimate','Test run'],
    ['New appliance consultation',199,299,30,'Discuss appliance options and request a sales quote.','Needs assessment','Product guidance','Purchase quote']]},
  { id:'plumber', group:'home', icon:'drop', title:['Plumber','ପ୍ଲମ୍ବର୍'], blurb:['Leaks, taps, drains and fittings','ଲିକ୍, ଟ୍ୟାପ୍, ଡ୍ରେନ୍ ଓ ଫିଟିଂ'], items:[
    ['Tap & leak repair',249,399,45,'Inspect and repair a dripping tap or a minor leak.','Leak check','Fitting adjustment','Water flow test'],
    ['Drain unblocking',399,599,60,'Clear a blockage in a kitchen or bathroom drain.','Blockage check','Drain clearing','Flow test'],
    ['Bathroom fitting installation',499,749,60,'Install a supplied tap, shower head or similar fitting.','Removal if needed','New fitting','Leak test']]},
  { id:'carpentry', group:'home', icon:'hammer', title:['Carpentry','କାଠ କାମ'], blurb:['Furniture, doors and shelves','ଫର୍ଣ୍ଣିଚର୍, କବାଟ ଓ ସେଲ୍ଫ'], items:[
    ['Door & hinge repair',299,449,45,'Adjust a sticking door or replace a damaged hinge.','Alignment check','Hinge fitting','Movement test'],
    ['Furniture assembly',499,749,75,'Assemble one flat-pack furniture item.','Parts check','Assembly','Stability check'],
    ['Shelf & curtain rod fitting',349,499,45,'Install your shelf or curtain rod.','Marking','Wall mounting','Level check']]},
  { id:'painting', group:'home', icon:'paint', title:['Painting','ରଙ୍ଗ କାମ'], blurb:['Wall touch-ups and room painting','କାନ୍ଥ ମରାମତି ଓ ଘର ରଙ୍ଗ'], items:[
    ['Wall patch & touch-up',499,699,60,'Patch small marks and touch up a section of wall.','Surface prep','Minor patching','Touch-up'],
    ['Single-room painting',1499,1999,180,'Labour estimate for a simple one-room repaint.','Surface check','Floor protection','Paint application']]},
  { id:'tiles', group:'home', icon:'tiles', title:['Tiles Worker','ଟାଇଲ୍ସ ମିସ୍ତ୍ରୀ'], blurb:['Tile replacement, fitting and grouting','ଟାଇଲ୍ସ ବଦଳ, ଫିଟିଂ ଓ ଗ୍ରାଉଟିଂ'], items:[
    ['Tile replacement visit',399,599,60,'Inspect a damaged tile and assess like-for-like replacement.','Damage check','Area measurement','Repair quote'],
    ['Tile grout repair',599,849,90,'Refresh grout in a small tile section.','Old grout removal','Regrouting','Surface clean']]},
  { id:'purifier', group:'electronics', icon:'filter', title:['Water Purifier Repair','ପାଣି ଫିଲ୍ଟର ମରାମତି'], blurb:['RO servicing and filter replacement','ଆର୍‌ଓ ସର୍ଭିସ୍ ଓ ଫିଲ୍ଟର ବଦଳ'], items:[
    ['RO purifier service',399,599,60,'Inspect, clean and test your existing purifier.','Filter check','Cleaning','Water flow test'],
    ['Filter replacement visit',499,749,75,'Fit replacement filters after assessing your purifier model.','Model check','Filter fitting','Leak test']]},
  { id:'moving', group:'home', icon:'box', title:['Packers & Movers','ପ୍ୟାକର୍ସ ଓ ମୁଭର୍ସ'], blurb:['Packing and local household moves','ପ୍ୟାକିଂ ଓ ସ୍ଥାନୀୟ ଘର ବଦଳ'], items:[
    ['Packing assistance',799,1099,120,'Get help packing a small set of household items.','Item assessment','Packing labour','Box labelling'],
    ['Local move survey',299,499,45,'Get a moving estimate based on distance and volume.','Inventory check','Access check','Moving quote']]},
  { id:'barber', group:'care', icon:'scissors', title:['Barber Service','ବାରିକ ସେବା'], blurb:['Haircut and beard grooming at home','ଘରେ ଚୁଟି ଓ ଦାଢ଼ି କାଟିବା ସେବା'], items:[
    ['Men’s haircut',299,449,45,'An at-home haircut with basic styling.','Style consultation','Haircut','Cleanup'],
    ['Haircut & beard trim',399,599,60,'A complete haircut and beard shaping session.','Haircut','Beard trim','Cleanup'],
    ['Beard styling',199,299,30,'Beard trimming and shaping at home.','Trim','Line-up','Cleanup']]},
  { id:'tutor', group:'care', icon:'book', title:['Home Tutor','ଘରୋଇ ଶିକ୍ଷକ'], blurb:['One-to-one help with school subjects','ସ୍କୁଲ ବିଷୟ ପାଇଁ ଘରୋଇ ପଢ଼ା'], items:[
    ['Introductory tutoring session',349,499,60,'Meet a tutor and discuss your child’s learning goals.','Learning check','Sample lesson','Study plan'],
    ['Maths & science tutoring',499,699,60,'One-to-one support for school maths or science.','Topic review','Worked examples','Practice exercises']]},
  { id:'grocery', group:'delivery', icon:'bag', title:['Grocery Delivery','କିରାଣା ଡେଲିଭରି'], blurb:['Fresh produce and pantry essentials','ତାଜା ପନିପରିବା ଓ ରାସନ ସାମଗ୍ରୀ'], items:[
    ['Local grocery pickup',69,99,60,'Share your grocery list and a preferred local shop. Groceries are billed separately.','List confirmation','Local pickup','Doorstep delivery'],
    ['Fresh produce pickup',89,129,60,'Request pickup of fruits and vegetables. Produce is billed separately.','Order confirmation','Market pickup','Doorstep delivery']]},
  { id:'medicine', group:'delivery', icon:'medical', title:['Medicine Delivery','ଔଷଧ ଡେଲିଭରି'], blurb:['Pickup from a local pharmacy','ସ୍ଥାନୀୟ ଔଷଧ ଦୋକାନରୁ ଡେଲିଭରି'], items:[
    ['Pharmacy pickup',79,119,60,'Request pickup from a local pharmacy. Medicines are billed separately by the pharmacy, which checks any required prescription.','Pharmacy confirmation','Pickup','Doorstep delivery']]}
];
