import { client, previewClient } from "./contentful";
import {
  ExperienceMapper,
  AudienceMapper,
  ExperienceEntryLike,
  AudienceEntryLike,
} from "@ninetailed/experience.js-utils-contentful";

export { ExperienceMapper } from "@ninetailed/experience.js-utils-contentful";

/** Strip circular references so the data can be serialized as Next.js page props. */
function serializeSafe<T>(value: T): T {
  const seen = new WeakSet();
  return JSON.parse(
    JSON.stringify(value, (_, v) => {
      if (typeof v === "object" && v !== null) {
        if (seen.has(v)) return undefined;
        seen.add(v);
      }
      return v;
    }),
  );
}

export async function getAllExperiences(preview = false) {
  const api = preview ? previewClient : client;

  const entries = await api.getEntries({
    content_type: "nt_experience",
    include: 1,
  });

  const experiences = entries.items as unknown as ExperienceEntryLike[];

  return serializeSafe(
    (experiences || [])
      .filter((entry) => ExperienceMapper.isExperienceEntry(entry))
      .map((entry) => ExperienceMapper.mapExperience(entry)),
  );
}

export async function getAllAudiences(preview = false) {
  const api = preview ? previewClient : client;

  const entries = await api.getEntries({
    content_type: "nt_audience",
    include: 0,
  });

  const audiences = entries.items as unknown as AudienceEntryLike[];

  const validAudiences = (audiences || []).filter((entry) =>
    AudienceMapper.isAudienceEntry(entry)
  );

  const mappedAudiences = validAudiences.map((entry) =>
    AudienceMapper.mapAudience(entry)
  );

  const audienceEntryIdMap: Record<string, string> = {};
  validAudiences.forEach((entry: any) => {
    if (entry.fields?.nt_audience_id && entry.sys?.id) {
      audienceEntryIdMap[entry.fields.nt_audience_id] = entry.sys.id;
    }
  });

  return { mappedAudiences, audienceEntryIdMap };
}
