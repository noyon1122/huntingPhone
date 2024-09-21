const loadData = async(searchText='13',isshowAll)=>{
    
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data=await res.json();
    const phones=(data.data)
    displayPhone(phones,isshowAll);
}
function displayPhone(phones,isshowAll)
{
    //step 1: get the original div
    const phoneContaier=document.getElementById('phones_div');
    //Clear all item before adding new phones
    phoneContaier.textContent='';


    // display show all button if phones more than 12

    const showallPhone=document.getElementById("show_all");
    if(phones.length>12 && !isshowAll)
    {
        showallPhone.classList.remove('hidden');
    }
    else {
        showallPhone.classList.add('hidden');
    }

    //slice phones items
    if(!isshowAll)
    { 
      phones=phones.slice(0,12);
    }
   

    phones.forEach(phone=> {
       // console.log(phone);

        //step 2 : create a div
        const phoneCard=document.createElement('div');
        phoneCard.classList='card bg-slate-200 shadow-xl hover:bg-slate-300 transition duration-150 ease-in-out ';
        //step 3: set inner Html
       
        phoneCard.innerHTML=`
         <figure class="px-10 pt-10">
                  <img
                    src="${phone.image}"
                    alt="Shoes"
                    class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>${phone.slug}</p>
                  <div class="card-actions">
                    <button onClick="showDetails('${phone.slug}')"; class="btn btn-primary">Show Details</button>
                  </div>
                </div>
        `;
        //step 4 append child
        phoneContaier.appendChild(phoneCard);

        //hide loading spinner
        loadingSpinner(false);
  
    });
}
//Show Deatils

const showDetails =async(id)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data=await res.json();
  //console.log(data);
  const phone=data.data;
  console.log(phone);
  showPhoneDetails(phone);


}

//show all phone detais
 const showPhoneDetails =(phone)=>{
  // console.log(phone);
  const phoneDetailsContainer=document.getElementById('phone_details');
   phoneDetailsContainer.innerHTML=`
             <div class="flex justify-center items-center"><img  src="${phone.image}" /></div>
             <h2 class="font-extrabold my-3">${phone.name}</h2>
             <p><span class="font-bold">Store:</span> ${phone.mainFeatures.storage}</p>
             <p><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
             <p><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
             <p><span class="font-bold">Slug:</span> ${phone.slug}</p>
             <p><span class="font-bold">Brand:</span> ${phone.brand}</p>   
   
   `;
  //show modal
  my_modal_5.showModal();
 }
const SearchData = (isshowAll) =>{
   console.log("Search data");
   //loadSpinner Called
   loadingSpinner(true);
   const searchfield=document.getElementById('search_field');
   const searchText=searchfield.value;
   //console.log(searchText);
   loadData(searchText,isshowAll);
}
//loadData();

const loadingSpinner = (load)=>{
  const loadSpinnerField=document.getElementById('spinner');
  //console.log('load Spinner');
  if(load)
  {
    loadSpinnerField.classList.remove('hidden');
  }
  else{
    loadSpinnerField.classList.add('hidden');
  }
}

//Show All phone

const showAll=()=>
{
  // const showAllField=document.getElementById('show_all');
  SearchData(true);

}


loadData();