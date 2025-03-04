import { Company } from "./Company";
import { CompanyPosition } from "./CompanyPosition";

import { PlayerCondition, haveSkill, haveCompanyRep } from "../Faction/FactionJoinCondition";
import { getRecordEntries } from "../Types/Record";

export function getJobRequirements(company: Company, pos: CompanyPosition): PlayerCondition[] {
  const reqSkills = pos.requiredSkills(company.jobStatReqOffset);
  const reqs = [];
  for (const [skillName, value] of getRecordEntries(reqSkills)) {
    if (value > 0) {
      reqs.push(haveSkill(skillName, value));
    }
  }
  if (pos.requiredReputation > 0) {
    reqs.push(haveCompanyRep(company.name, pos.requiredReputation));
  }
  return reqs;
}

/** Returns a string with the given CompanyPosition's stat requirements */
export function getJobRequirementText(company: Company, pos: CompanyPosition): string {
  const reqs = getJobRequirements(company, pos);
  return `(${pos.name} requires: ${reqs.map((s) => s.toString()).join(", ")})`;
}
