const newman = require('newman');
const cron = require('node-cron');
const cities = require('./cities');
let count = 0;

// Function to create a collection request for a specific city
function createCityRequest(city) {
    return {
        operationName: "searchJobCardsByLocation",
        variables: {
            searchJobRequest: {
                locale: "en-CA",
                country: "Canada",
                pageSize: 100,
                geoQueryClause: {
                    lat: city.coordinates.lat,
                    lng: city.coordinates.lng,
                    unit: "km",
                    distance: city.coordinates.distance
                }
            }
        },
        query: `query searchJobCardsByLocation($searchJobRequest: SearchJobRequest!) {
            searchJobCardsByLocation(searchJobRequest: $searchJobRequest) {
                nextToken
                jobCards {
                    jobId
                    language
                    dataSource
                    requisitionType
                    jobTitle
                    jobType
                    employmentType
                    city
                    state
                    postalCode
                    locationName
                    totalPayRateMin
                    totalPayRateMax
                    tagLine
                    bannerText
                    image
                    jobPreviewVideo
                    distance
                    featuredJob
                    bonusJob
                    bonusPay
                    scheduleCount
                    currencyCode
                    geoClusterDescription
                    surgePay
                    jobTypeL10N
                    employmentTypeL10N
                    bonusPayL10N
                    surgePayL10N
                    totalPayRateMinL10N
                    totalPayRateMaxL10N
                    distanceL10N
                    monthlyBasePayMin
                    monthlyBasePayMinL10N
                    monthlyBasePayMax
                    monthlyBasePayMaxL10N
                    jobContainerJobMetaL1
                    virtualLocation
                    poolingEnabled
                    __typename
                }
                __typename
            }
        }`
    };
}

// Function to run collection for all cities
async function runCollectionForAllCities() {
    console.log('\n=== Starting Job Search ===\n');
    
    for (const city of cities) {
        await new Promise((resolve) => {
            const cityRequest = createCityRequest(city);
            
            newman.run({
                collection: {
                    ...require('./collection.json'),
                    item: [
                        {
                            name: city.name,
                            item: [
                                {
                                    ...require('./collection.json').item[0].item[0],
                                    request: {
                                        ...require('./collection.json').item[0].item[0].request,
                                        body: {
                                            mode: 'raw',
                                            raw: JSON.stringify(cityRequest)
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                environment: require('./environment.json'),
                reporters: null,
                silent: true
            }, function (err, summary) {
                if (err) {
                    console.error(`Error searching jobs in ${city.name}:`, err);
                } else {
                    if (summary.run.executions && summary.run.executions.length > 0) {
                        const response = summary.run.executions[0].response;
                        if (response) {
                            try {
                                const responseBody = JSON.parse(response.stream.toString());
                                const jobCards = responseBody.data?.searchJobCardsByLocation?.jobCards;
                                
                                console.log(`\n>> ${city.name}:`);
                                if (jobCards && jobCards.length > 0) {
                                    console.log(`Found ${jobCards.length} jobs`);
                                } else {
                                    console.log('No new jobs found');
                                }
                            } catch (parseError) {
                                console.log(`Error parsing response for ${city.name}`);
                            }
                        }
                    }
                }
                resolve();
            });
        });
    }
    
    count += 1;
    console.log(`\n[OK] Completed search #${count}`);
}

// Run immediately when script starts
console.log('[START] Starting job search...');
runCollectionForAllCities();

// Schedule the task to run every minute
cron.schedule('* * * * *', () => {
    console.log('\n[SCHEDULE] Running scheduled search...');
    runCollectionForAllCities();
});













