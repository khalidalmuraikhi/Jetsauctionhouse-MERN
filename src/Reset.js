import React, { Component } from 'react'
import db from './db'
import Button from 'material-ui/Button';

export default class Reset extends Component {

    async handleReset(item) {

        const collections = ['items', 'users', 'expired']

        await Promise.all(
            collections.map(
                async collection => await db.collection(collection).deleteAll()
            )
        )

        const users = [
            { _id: 'good@seller.com', password: "123456", age:'22', gender:'female', likes: [], contacts: [], feedbacks: [], messages: [] },
            { _id: 'normal@seller.com', password: "123456",  age:'40', gender:'female', likes: [], contacts: [], feedbacks: [], messages: [] },
            { _id: 'bad@seller.com', password: "123456",  age:'10', gender:'male', likes: [], contacts: [], feedbacks: [], messages: [] }
        ]

        const ads = [
            { age:"youngadult", gender:"male", imageUrl:"https://www.advertgallery.com/wp-content/uploads/2016/04/nissan-terrano-toi-mum-8-4-2016.jpg" },
            { age:"youngadult", gender:"male", imageUrl:"http://payload.cargocollective.com/1/5/163822/2267982/GoldsGym_900.jpg" },
            { age:"youngadult", gender:"female", imageUrl:"https://rioconn.files.wordpress.com/2011/12/final-released-horizontal-ad-cvm-judd_25-3-x-16_06-01-2012.jpg" },

            { age:"adult", gender:"female", imageUrl:"https://i.ytimg.com/vi/uxwu-nrHv9A/maxresdefault.jpg" },
            { age:"adult", gender:"male", imageUrl:"http://www.taylor.agency/wp-content/uploads/2015/05/Princess-Adverts-FINAL-WEB-9.4-1024x724.jpg" },
       
        ]
        await Promise.all(
            users.map(
                async user => await db.collection('users').createOne(user)
            )
        )

        await Promise.all(
            ads.map(
                async ads => await db.collection('ads').createOne(ads)
            )
        )

        const items = [
            { name: 'Dassault Falcon 2000', imageUrl: 'http://www.trendingmotor.com/wp-content/uploads/2016/11/Gulfstream-G-550.jpg', category: 'Jet', description: 'Stunning contemporary interior completed 2017, Customised exterior, Hangered at all times, C-Check accomplished, EASA & FAA Compliant.', seller: 'good@seller.com', buyer: '', expiry: '2018-02-28', highbid: '', bids: [] },
            { name: 'Dassault Falcon 7X', imageUrl: 'http://imgproc.airliners.net/photos/airliners/8/5/3/2360358.jpg?v=v40', category: 'Jet', description: 'One Owner since new, Impeccable cabin interior with elegant design, Low hours, High Speed Swift Broadband Wifi Internet, Engine programs - ESP.', seller: 'bad@seller.com', buyer: '', expiry: '2018-03-29', highbid: 25000000, bids: [{ username: 'Khalid', amount: 25050000 }] },
            { name: 'Dassault Scorpion 900EX EASy', imageUrl: 'https://cdn.avbuyer.com/uploads/image/289401_289500/dassault-falcon-900ex-easy-289469_4de59d73c34c3abd_920X485.jpg', category: 'Jet', description: 'The aircraft underwent a major work package in 2013 by Dassault, Little Rock: Paint & Custom Interior by Dassault, Wilmington, November 2015 Fresh C Inspection API Winglet (LX) Installation EASy II Upgrades WAAS/LPV/CPDLC Provisioning & ADS-B Out Synthetic Vision System Aircell ATG-5000 Gogo Biz High Speed Internet Engines & APU on Honeywell MSP Gold 1A/1A+/2A/2A+/3A/4A+ Inspections c/w October 2016 Z Inspection c/w October 2016.', seller: 'normal@seller.com', buyer: '', expiry: '2018-03-29', highbid: 34000000, bids: [{ username: 'Abdulaziz', amount: 35000000 }] },
            { name: 'Sikorsky S-92 A', imageUrl: 'https://www.outsidepursuits.com/wp-content/uploads/2017/02/Best-Oahu-Helicopter-Tours.jpg', category: 'Helicopter', description: 'Engines on GE Maintenance Cost Per Hour (MCPH), Airframe, Avionics, Drivetrains & APU on Sikorsky TAP, Sea State Level Five (6) Floats, Fifth MFD.', seller: 'normal@seller.com', buyer: '', expiry: '2018-03-29', highbid: '', bids: [] },
            { name: 'Airbus/Eurocopter EC 145', imageUrl: 'https://cdn.avbuyer.com/uploads/image/351001_351100/airbus-eurocopter-ec-145-351063_792acebbf62c6439_920X485.jpg', category: 'Helicopter', description: '2014 EUROCOPTER EC145 MERCEDES BENZ, The EC145 is the only helicopter in its category to combine a roomy cabin andexcellent window visibility, providing exceptional passenger comfort. This aircraft offers high rotor clearance and large luggage clamshell doors, and extra-thick interior insulation and special flooring that damps out any residual vibration. The EC145, with its sporty yet elegant atmosphere, invites passengers onboard via large sliding doors that provide easy cabin access.', seller: 'normal@seller.com', buyer: '', expiry: '2018-03-29', highbid: 6500000, bids: [{ username: 'Khlaid', amount: 6600000 }, { username: 'Noor', amount: 6650000 }, { username: 'Abdulaziz', amount: 7000000 }] },
            { name: 'AH-64 Apache', imageUrl: 'https://static4.comicvine.com/uploads/original/11119/111195111/5761558-ah-64-apache-1.jpg', category: 'Helicopter', description: 'The Apache Guardian is fitted with a mast mounted antenna with updated Longbow fire control radar. This attack helicopter can fire Hellfire 2 anti-tank guided missiles in fire-and-forget mode. Other improvements include targeting, battle management system, cockpit, communications, weapons and navigation systems. The gunship is also fitted with a 30 mm cannon.', seller: 'normal@seller.com', buyer: '', expiry: '2018-03-29', highbid: 13900000, bids: [{ username: 'Abdulaziz', amount: 14000000 }] },
            { name: 'Lockheed F-117 Nighthawk', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/F-117_Nighthawk_Front.jpg/1200px-F-117_Nighthawk_Front.jpg', category: 'War Planes', description: 'The Lockheed F-117 Nighthawk is an American single-seat, twin-engine stealth attack aircraft that was developed by Lockheeds secretive Skunk Works division and operated by the United States Air Force (USAF). The F-117 was based on the Have Blue technology demonstrator.', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 111200000, bids: [{ username: 'Khalid', amount: 111500000 }, { username: 'Abdulaziz', amount: 111800000 }] },
            { name: 'Eurofighter Typhoon', imageUrl: 'https://www.ainonline.com/sites/default/files/styles/ain30_fullwidth_large_2x/public/uploads/2016/07/382-eurofighter-typhoon.jpg?itok=dB3EqpHC&timestamp=1468353789', category: 'War Planes', description: 'Development of the Eurofighter Typhoon into a multi-role combat jet has taken a long time. But the aircraft displayed here by BAE Systems test pilot Nat Makepeace shows that this capability is finally nearing. It is carrying six MBDA Brimstone air-to-ground missiles on two three-rail under-wing launchers, plus two Raytheon Paveway IV laser and GPS-guided bombs. In addition, four MBDA Meteor BVRAAMs nestle on under-fuselage stations, and two MBDA ASRAAM shorter-range AAMs occupy the outer pylons.', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 125000000, bids: [{ username: 'Khalid', amount: 125500000 }, { username: 'Noor', amount: 128000000 }, { username: 'Namreen', amount: 130000000 }, { username: 'Abdulaziz', amount: 135000000 }] },
            { name: 'F-22 Raptor', imageUrl: 'https://www.aviationcv.com/aviation-blog/wp-content/uploads/2017/05/F-22-Raptor.jpg', category: 'War Planes', description: 'Lockheed Martin F-22 Raptor is number one our list of top ten fighter jets in the world. It is super stealthy and is virtually invisible to radar. F-22 is extremely advanced twin-engine aircraft having super maneuverability. F-22 Raptor was inducted into the US Air Force in 2005.', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 339000000, bids: [{ username: 'Abdulaziz', amount: 340000000 }] },
            { name: 'Airbus A380', imageUrl: 'https://www.businesstraveller.de/wp-content/uploads/2017/11/qatar_a380-800_30782176173_o-1-e1481631044230.gif', category: 'Commercial Planes', description: 'the worlds largest passenger airliner, and the airports at which it operates have upgraded facilities to accommodate it. It was initially named Airbus A3XX and designed to challenge Boeings monopoly in the large-aircraft market.', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 445600000, bids: [{ username: 'Noor', amount: 445650000 }, { username: 'Khalid', amount: 445700000 }] },
            { name: 'Airbus A320', imageUrl: 'https://3dwarehouse.sketchup.com/warehouse/getpubliccontent?contentId=63448356-6c89-46b2-8935-9e740486b1f5', category: 'Commercial Planes', description: 'The A320neo offers new, more efficient engines, combined with airframe improvements and the addition of winglets, named Sharklets by Airbus. The aircraft will deliver fuel savings of up to 15%.', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 71900000, bids: [{ username: 'Khalid', amount: 72000000 }] },
            { name: 'Boeing 787', imageUrl: 'https://www.ainonline.com/sites/default/files/styles/ain30_fullwidth_large_2x/public/uploads/2018/01/b787-10low.jpg?itok=Usdzhhy6&timestamp=1516805384', category: 'Commercial Planes', description: 'The 787’s unparalleled fuel efficiency and range flexibility enables carriers to profitably open new routes as well as optimize fleet and network performance. And for their passengers, an experience like none other in the air, with more comfort and less fatigue. The Dreamliner effect. That’s a better way to fly.', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 189000000, bids: [{ username: 'Noor', amount: 189500000 }, { username: 'Khalid', amount: 190000000 }] },
            { name: 'Cessna Grand Caravan 208', imageUrl: 'https://resources.globalair.com/aircraftforsale/images/ads/original/84060_N154SB_208B5076_20141015_355.jpg?w=650&h=430&mode=max', category: 'Amphibian Planes', description: 'Garmin G1000 Avionics, Garmin GIA 63W Dual Integrated Avionics Unit Includes Nav/Com/GPS, GRS 77 Dual Attitude and Heading Reference System, Garmin GMC 710 Autopilot Mode Controller, Garmin GTX 33 Mode S Transponder, KN-63 DME, PA System with Aft Cabin Speakers, Garmin Relative Terrain/Obstacles, Garmin Flight Charts Capable, Garmin Safe Taxi Capable', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 1900000, bids: [{ username: 'Noor', amount: 1950000 }, { username: 'Khalid', amount: 1700000 }] },
            { name: 'Cessna Caravan Amphibious', imageUrl: 'https://resources.globalair.com/aircraftforsale/images/ads/original/81837_13_CessnaCaravan208Amphib_sn20800552__e1.jpg?w=650&h=430&mode=max', category: 'Amphibian Planes', description: 'The Aircraft is on Wipline 8750 Amphibious Floats, offering increased max takeoff weight (8750 lbs) and zero landing weight restrictions. The newly designed Wipline 8750 provides a modified hull design and additional aft floatation for combined best in class handling in rough water, complimented with firewall reinforcements! ', seller: 'bad@seller.com', buyer: '', expiry: '2018-04-13', highbid: 1690000, bids: [{ username: 'Noor', amount: 1750000 }, { username: 'Abdulaziz', amount: 1700000 }] },
        ]
        await Promise.all(
            items.map(
                async item => await db.collection('items').createOne(item)
            )
        )
    }
    state = {
        age: ''
    };

    render() {
        return (
            <Button color="inherit" onClick={() => this.handleReset()}>Reset</Button>
        )
    }
}
