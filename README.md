# k6

Tool evaluation and experimentation area

## Positives

* Thresholds are really good, the grown up way to talk about load testing.
* An excellent way to begin the SLO implementation, with something you can show codified early
* Batching might be good for early and obvious concurrency testing
* Really like the thresholds that use percentiles rather than averages. Avg is misleading from a raw performance point of view.
* Usually more interested in the edges rather than the middle.
* Like the meta checks such as content size, not too deep an assertion, reducing the duplication with acceptance test automation.

## Negatives

* Yet to see how you would do peak type scenarios
* I can see how you might drift into API acceptance testing here, but is it the right tool? Could just be convienience
* Chaining thresholds requires some investigation by eye, might be tempting but better split especially if being used as a hook.
* You have to specifically abort a test when a threshold is reached. Will need to be careful using this in a pipeline to check for artifact readiness.
* When does it fail? When the threshold is breached for the first time? What about averages? Seems to be when you first hit that threshold. I guess its just first eval, rather than a cooldown.
* For an avg of 200 set to abort on fail, it ran the full test then failed. Be careful which thresholds you use I guess.

## Overall

* At the moment, this would be an early win type tool, rather than an established tool for load testing for a build it, run it team.
