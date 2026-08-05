import { loadAndDisplayItems } from './fetch-data.mjs'; // Correct path from within the scripts folder
import { setupModalListener } from './modal.mjs'; // Correct path from within the scripts folder
// import { handleLocalStorage } from './storage.mjs';
// import { initializeNavigation } from './navigation.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    // Placeholder calls for other modules you will create
    // initializeNavigation();
    // handleLocalStorage();
    
    // Page-specific initializations
    const dataContainerSelector = '#data-cards-container';
    if (document.querySelector(dataContainerSelector)) {
        // Wait for items to be loaded and get the data
        const itemsData = await loadAndDisplayItems(dataContainerSelector);
        // If data was loaded successfully, set up the modal
        if (itemsData) {
            setupModalListener(itemsData);
        }
    }
});