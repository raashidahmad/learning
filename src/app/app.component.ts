import { Component } from '@angular/core';
import { combineLatest, forkJoin, of, zip } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Schema } from './schema/schema';
import { HttpClient } from '@angular/common/http';
import { HelperService } from './services/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Indices 3.0 - Mock API Schema';
  schema: any = Schema.entities;

  statuses: any = [
    { "id": 1, "status": "Pursuable", "subStatuses": [] },
    { "id": 2, "status": "Completed", "subStatuses": [] },
    { "id": 3, "status": "Issued", "subStatuses": [] },
    { "id": 4, "status": "Closed", "subStatuses": [] }
  ];

  constructor(private http: HttpClient, private helper: HelperService,
  ) {
    //this.testOperators();
    //this.mergeHTTPRequestWithFork();
    this.testStatusData();
  }

  testOperators() {
    /*let srcObservable = of(1, 2, 3, 4);
    let innerObservable = of('A', 'B', 'C', 'D');

    srcObservable.pipe(
      mergeMap(val => {
        console.log('Source value ' + val)
        console.log('starting new observable')
        return innerObservable
      })
    )
      .subscribe(ret => {
        console.log('Recd ' + ret);
      });*/

    of("hound", "mastiff", "retriever")
      .subscribe(breed => {
        const url = 'https://dog.ceo/api/breed/' + breed + '/list';

        this.http.get<any>(url)
          .subscribe(data => {
            console.log(data)
          });
      });
  }

  mergeHTTPRequestWithFork() {

    //const url='https://dog.ceo/api/breed/'+hound+'/list';

    of("hound", "mastiff", "retriever")
      .pipe(
        mergeMap(breed => {
          const url1 = 'https://dog.ceo/api/breed/' + breed + '/list';
          const url2 = 'https://dog.ceo/api/breed/' + breed + '/images/random';

          let obs1 = this.http.get<any>(url1);
          let obs2 = this.http.get<any>(url2);

          return forkJoin([obs1, obs2]);

        })
      )
      .subscribe(data => {
        console.log(data)
      });
  }

  testStatusData() {
    let states = [{
      'code': 'NY',
      'state': 'New York'
    }, {
      'code': 'FL',
      'state': 'Florida'
    }, {
      'code': 'CL',
      'state': 'California'
    }
    ]
    let statusId = 1;
    this.statuses.forEach((s: any) => {
    let stateIndex = this.helper.getRandomInRange(0, 2);
    let stateObj = states[stateIndex];
    let importDateIndex = this.helper.getRandomInRange(1, 50);
    s.stateCode = stateObj.code;
    s.serviceYearId = this.helper.getRandomInRange(1, 50);
    s.serviceId = this.helper.getRandomInRange(1, 50);
    s.projectId = this.helper.getRandomInRange(1, 50);
    s.medicalGroupId = this.helper.getRandomInRange(1, 50);
    s.siteId = this.helper.getRandomInRange(1, 50);
    s.providerId = this.helper.getRandomInRange(1, 50);
    s.specialityId = this.helper.getRandomInRange(1, 50);
    //s.importDate = importDates[importDateIndex];

    //database.statuses.push(s);
    let subLimit = this.helper.getRandomInRange(3, 5);
    for (let i = 0; i < subLimit; i++) {
        let subStatus: any = {
            "subStatusId": statusId++,
            "statusId": s.statusId,
            "subStatus": 'Sub status ' + statusId,
            "subSubStatuses": []
        };

        let subSubLimit = this.helper.getRandomInRange(1, 3);
        for (let j = 0; j < subSubLimit; j++) {
            let subSubStatus: any = {
                "subSubStatusId": statusId++,
                "subStatusId": subStatus.subStatusId,
                "subSubStatus": 'Sub sub status - ' + statusId,
            }
            subStatus.subSubStatuses.push(subSubStatus);
            //database.subSubStatuses.push(subSubStatus);
        }
        //database.subStatuses.push(subStatus);
        s.subStatuses.push(subStatus);
    }
});

let pursuitStatuses: any = JSON.parse(JSON.stringify(this.statuses));
pursuitStatuses.forEach((s: any) => {
    let levelOneStatusValue = 1;
    let iteration = s.subStatuses.length;

    if (s.id == 1) {
        levelOneStatusValue = this.helper.getRandomInRange(15000, 16000);
    } else if (s.id == 2) {
        levelOneStatusValue = this.helper.getRandomInRange(2500, 3000);
    } else if (s.id == 3) {
        levelOneStatusValue = this.helper.getRandomInRange(2000, 2500);
    } else if (s.id == 4) {
        levelOneStatusValue = this.helper.getRandomInRange(1500, 2000);
    }

    let levelTwoAllocated = iteration == 1 ? levelOneStatusValue : parseInt((levelOneStatusValue / 2).toString());
    let levelTwoRemaining = levelTwoAllocated;
    s.value = levelOneStatusValue;

    for (var i = 0; i < iteration; i++) {
        let randomValue = 1;
        if (i == 0) {
            s.subStatuses[i].value = levelTwoAllocated;
        } else if (i > 0 && i < iteration - 1) {
            randomValue = parseInt(this.helper.getRandomInRange(1, (levelTwoRemaining / 2)).toString());
            s.subStatuses[i].value = randomValue;
            levelTwoRemaining = levelTwoRemaining - randomValue;
        } else {
            s.subStatuses[i].value = levelTwoRemaining;
        }

        let internalIteration = s.subStatuses[i].subSubStatuses.length;
        let levelThreeAllocated = internalIteration == 1 ? s.subStatuses[i].value : parseInt((s.subStatuses[i].value / 2).toString());
        let levelThreeRemaining = levelThreeAllocated;

        for (var j = 0; j < internalIteration; j++) {
            if (j == 0) {
                s.subStatuses[i].subSubStatuses[j].value = levelThreeAllocated;
            } else if (j > 0 && j < internalIteration - 1) {
                let randomValue = parseInt(this.helper.getRandomInRange(1, levelThreeRemaining / 2).toString());
                s.subStatuses[i].subSubStatuses[j].value = randomValue;
                levelThreeRemaining = levelThreeRemaining - randomValue;
            } else {
                s.subStatuses[i].subSubStatuses[j].value = levelThreeRemaining;
            }
        }
    }
    console.log(s);
    //database.pursuitStatuses.push(s);
});
    //console.log(this.statuses);
  }
}
