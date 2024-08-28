import { insertServices } from "../services/workServices";
import { servicesSchema } from "../utils/zodSchemas";

export const insertServicesController = async (req: any, res: any) => {
  const parsed = servicesSchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ Message: "Invalid input found.", data: parsed.error });
  }
  const { name, description, price, imageUrl, duration } = parsed.data;
  try {
    const response = await insertServices(
      name,
      description,
      duration,
      price,
      imageUrl
    );
    console.log(response)
    if (response) {
      res.status(201).json({ Message: "Service has successfully Added." });
    } else {
      res.status(500).json({ Message: "Unable to insert in Database." });
    }
  } catch (error) {
    res.status(500).status("Internal server error.");
  }
};
